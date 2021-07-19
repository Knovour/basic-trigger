import aria from '../utils/aria'

type Event = 'dialog:show' | 'dialog:close'

type Status = 'show' | 'close'
type OverlayClass = string | '.overlay'

function overlayInit($dialog, isLocked, overlay: OverlayClass, cb) {
	const $overlay = $dialog.querySelector(overlay) || document.querySelector(overlay)

	return (status: Status) => {
		if (!$overlay) return

		$overlay.hidden = status === 'close'

		if (isLocked) return

		status === 'show' ? $overlay.addEventListener('click', cb) : $overlay.removeEventListener('click', cb)
	}
}

function generateClassList(classList) {
	switch (true) {
		case !classList:
			return []
		case Array.isArray(classList):
			return classList
		default:
			return [classList]
	}
}

function dial($dialog, closeDialog, classes) {
	const toggleClasses = {
		show: generateClassList(classes?.show),
		close: generateClassList(classes?.close),
	}

	return (status: Status) => {
		$dialog.hidden = status === 'close'
		$dialog.dispatchEvent(new CustomEvent(`dialog:${status}`))

		if (status === 'show') {
			$dialog.addEventListener('click', closeDialog)
			$dialog.classList.remove(...toggleClasses.close)
			$dialog.classList.add(...toggleClasses.show)
		} else {
			$dialog.removeEventListener('click', closeDialog)
			$dialog.classList.remove(...toggleClasses.show)
			$dialog.classList.add(...toggleClasses.close)
		}
	}
}

function dispatchCloseEvent($dialog, cb) {
	$dialog.dispatchEvent(new CustomEvent('dialog:close'))
	cb()
}

function dispatchCustomEvent($dialog, closeDialog) {
	return ({ target }) => {
		const { dialogEvent } = target.dataset
		if (!dialogEvent) return

		const eventDetail = {
			detail: {
				dialog: { close: closeDialog },
			},
		}

		dialogEvent === 'close'
			? dispatchCloseEvent($dialog, closeDialog)
			: $dialog.dispatchEvent(new CustomEvent(`dialog:${dialogEvent}`, eventDetail))
	}
}

function detectEsc($dialog, isLocked, closeDialog) {
	const escCheck = ({ key }) => key === 'Escape' && dispatchCloseEvent($dialog, closeDialog)

	return (status: Status) => {
		if (isLocked) return

		status === 'show'
			? document.addEventListener('keydown', escCheck)
			: document.removeEventListener('keydown', escCheck)
	}
}

type Options = {
	classes?: {
		show?: string | string[]
		close?: string | string[]
	}
	locked?: false | true // Disable ESC and overlay click event when true
	overlay?: OverlayClass
}

export default ($dialog, { classes = {}, locked, overlay = '.overlay' }: Options) => {
	if (!$dialog) throw new Error('Dialog not found.')

	let showDialog, closeDialog

	// const dialog = {
	// 	show,
	// }

	const toggleDialog = dial($dialog, dispatchCustomEvent($dialog, closeDialog), classes)

	const toggleOverlay = overlayInit($dialog, locked, overlay, closeDialog)
	const toggleListenEsc = detectEsc($dialog, locked, closeDialog)

	const handler = status => {
		toggleDialog(status)
		toggleOverlay(status)
		toggleListenEsc(status)
	}

	showDialog = () => handler('show')
	closeDialog = () => handler('close')

	aria()
		.findAll('controls', $dialog.id)
		.forEach($control => $control.addEventListener('click', showDialog))

	return {
		show: showDialog,
		close: closeDialog,
	}
}
