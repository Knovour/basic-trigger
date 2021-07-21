import aria from '../utils/aria'

type Status = 'show' | 'close'
type OverlayClass = string | 'overlay'

function classesInit(classes) {
	return [classes].flat().filter(name => !!name)
}

function toggleDialogClass($dialog, status: Status, { show, close }) {
	const [removeClasses, addClasses] = status === 'show' ? [close, show] : [show, close]

	$dialog.classList.remove(...removeClasses)
	$dialog.classList.add(...addClasses)
}

function dispatchDialogEvent($dialog, event, detail = {}) {
	$dialog.dispatchEvent(new CustomEvent(`dialog:${event}`), { detail })
}

function toggleHidden($elem, status: Status) {
	if (!$elem) return

	$elem.hidden = status === 'close'
}

function toggleEventBind($elem, event, status: Status, cb) {
	if (!$elem) return

	status === 'show' ? $elem.addEventListener(event, cb) : $elem.removeEventListener(event, cb)
}

type Options = {
	classes?: {
		show?: string | string[]
		close?: string | string[]
	}
	locked?: false | true // Disable ESC and overlay click event when true
	overlay?: OverlayClass
}

export default (id, { classes = {}, locked, overlay = 'overlay' }: Options) => {
	const $dialog = document.getElementById(id)
	if (!$dialog) throw new Error('Dialog not found.')

	const $overlay = $dialog.querySelector(`.${overlay}`) || document.querySelector(`.${overlay}`)

	const dialog = {
		status: 'close',
		classes: {
			show: classesInit(classes.show),
			close: classesInit(classes.close),
		},
		handler: {
			show: () => (dialog.status = 'show'),
			close: () => (dialog.status = 'close'),
		},
	}

	const escCheck = ({ key }) => key === 'Escape' && dialog.handler.close()

	new Proxy(dialog, {
		set(obj, prop, value) {
			if (prop !== 'status' || !['show', 'close'].includes(value)) return false

			toggleHidden($dialog, value)
			toggleHidden($overlay, value)

			toggleDialogClass($dialog, value, dialog.classes)
			dispatchDialogEvent($dialog, value)

			if (!locked) {
				toggleEventBind($overlay, 'click', value, dialog.handler.close)
				toggleEventBind(document, 'keydown', value, escCheck)
			}

			obj[prop] = value
			return true
		},
	})

	aria()
		.findAll('controls', $dialog.id)
		.forEach($control => $control.addEventListener('click', dialog.handler.show))

	$dialog.addEventListener('click', ({ target }) => {
		const { dialogEvent } = (target as HTMLElement).dataset
		if (!dialogEvent) return

		dialogEvent === 'close'
			? dialog.handler.close()
			: dispatchDialogEvent($dialog, dialogEvent, { close: dialog.handler.close })
	})

	return dialog.handler
}
