import aria from '../utils/aria'

type DefaultStatus = 'show' | 'hide'

function overlayHandler (isLocked, hideDialog, $overlay) {
	return (status: DefaultStatus) => {
		if (!$overlay)
			return

		$overlay.hidden = status === 'hide'

		if (isLocked)
			return

		status === 'show'
			? $overlay.addEventListener('click', hideDialog)
			: $overlay.removeEventListener('click', hideDialog)
	}
}

function generateClassList (classList) {
	switch (true) {
		case !classList: return []
		case Array.isArray(classList): return classList
		default: return [classList]
	}
}

function dialogHandler ($dialog, hideDialog, classes) {
	const toggleClasses = {
		show: generateClassList(classes?.show),
		hide: generateClassList(classes?.hide)
	}

	return (status: DefaultStatus) => {
		$dialog.hidden = status === 'hide'
		$dialog.dispatchEvent(new CustomEvent(status))

		if (status === 'show') {
			$dialog.addEventListener('click', hideDialog)
			$dialog.classList.remove(...toggleClasses.hide)
			$dialog.classList.add(...toggleClasses.show)
		}

		else {
			$dialog.removeEventListener('click', hideDialog)
			$dialog.classList.remove(...toggleClasses.show)
			$dialog.classList.add(...toggleClasses.hide)
		}
	}
}

function dispatchCloseEvent ($dialog, cb) {
	$dialog.dispatchEvent(new CustomEvent('close'))
	cb()
}

function dispatchCustomEvent ($dialog, hideDialog) {
	return ({ target }) => {
		const { dialogEvent } = target.dataset
		if (!dialogEvent)
			return

		const eventDetail = {
			detail: {
				dialog: { hide: hideDialog }
			}
		}

		dialogEvent === 'close'
			? dispatchCloseEvent($dialog, hideDialog)
			: $dialog.dispatchEvent(new CustomEvent(dialogEvent, eventDetail))
	}
}

function detectEsc ($dialog, isLocked, hideDialog) {
	const escCheck = ({ key }) =>
		(key === 'Escape') && dispatchCloseEvent($dialog, hideDialog)

	return (status: DefaultStatus) => {
		if (isLocked)
			return

		status === 'show'
			? document.addEventListener('keydown', escCheck)
			: document.removeEventListener('keydown', escCheck)
	}
}

type Options = {
	classes?: {
		show?: string | string[],
		hide?: string | string[]
	},
	overlay?: HTMLElement
}

export default ($dialog, { classes = {}, overlay }: Options) => {
	if (!$dialog)
		throw new Error('Dialog not found.')

	let showDialog, hideDialog

	const hasCloseBtn = $dialog.querySelector('[data-dialog-event="close"]') !== null
	const toggleDialog = dialogHandler($dialog, dispatchCustomEvent($dialog, hideDialog), classes)
	const toggleOverlay = overlayHandler(!hasCloseBtn, hideDialog, overlay)
	const toggleListenEsc = detectEsc($dialog, hasCloseBtn, hideDialog)

	const handler = status => {
		toggleDialog(status)
		toggleOverlay(status)
		toggleListenEsc(status)
	}

	showDialog = () => handler('show')
	hideDialog = () => handler('hide')

	aria()
		.findAll('controls', $dialog.id)
		.forEach($control =>
			$control.addEventListener('click', showDialog)
		)

	return {
		show: showDialog,
		hide: hideDialog
	}
}
