import aria from '../utils/aria'

type Status = 'show' | 'close'

function classesInit(classes) {
	const generate = classList => {
		switch (true) {
			case !classList:
				return []
			case Array.isArray(classList):
				return classList
			default:
				return [classList]
		}
	}

	return {
		show: generate(classes?.show),
		close: generate(classes?.close),
	}
}

function toggle($dialog, status: Status, { show, close }) {
	$dialog.hidden = status === 'close'

	const removeClasses = status === 'show' ? close : show
	const addClasses = status === 'show' ? show : close

	$dialog.classList.remove(...removeClasses)
	$dialog.classList.add(...addClasses)

	$dialog.dispatchEvent(new CustomEvent(`dialog:${status}`))
}

type OverlayClass = string | '.overlay'

function toggleOverlay($overlay, status: Status, locked, cb) {
	if (!$overlay) return

	$overlay.hidden = status === 'close'

	if (locked) return

	status === 'show' ? $overlay.addEventListener('click', cb) : $overlay.removeEventListener('click', cb)
}

function toggleGlobalEsc(status: Status, escCheck) {
	status === 'show' ? document.addEventListener('keydown', escCheck) : document.removeEventListener('keydown', escCheck)
}

type Options = {
	classes?: {
		show?: string | string[]
		close?: string | string[]
	}
	locked?: false | true // Disable ESC and overlay click event when true
	overlay?: OverlayClass
}

export default (id, { classes = {}, locked, overlay = '.overlay' }: Options) => {
	if (!id) throw new Error('Dialog ID not found.')

	const $dialog = document.getElementById(id)

	if (!$dialog) throw new Error('Dialog not found.')

	const $overlay = $dialog.querySelector(overlay) || document.querySelector(overlay)

	const dialog = {
		status: 'close',
		classes: classesInit(classes),
		handler: {
			show: () => (dialog.status = 'show'),
			close: () => (dialog.status = 'close'),
		},
	}

	new Proxy(dialog, {
		set(obj, prop, value) {
			if (prop !== 'status' || !['show', 'close'].includes(value)) return false

			toggle($dialog, value, dialog.classes)
			toggleOverlay($overlay, value, locked, dialog.handler.close)
			toggleGlobalEsc(value, escCheck)

			obj[prop] = value
			return true
		},
	})

	const escCheck = ({ key }) => !locked && key === 'Escape' && dialog.handler.close()

	aria()
		.findAll('controls', $dialog.id)
		.forEach($control => $control.addEventListener('click', dialog.handler.show))

	$dialog.addEventListener('click', ({ target }) => {
		const { dialogEvent } = (target as HTMLElement).dataset
		if (!dialogEvent) return

		if (dialogEvent === 'close') return dialog.handler.close()

		$dialog.dispatchEvent(
			new CustomEvent(`dialog:${dialogEvent}`, {
				detail: { close: dialog.handler.close },
			})
		)
	})

	return dialog.handler
}
