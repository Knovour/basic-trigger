import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import aria from '../utils/aria'

type Status = 'show' | 'close'
type OverlayClass = string | 'overlay'

function toggleDialogClass($dialog, status: Status, { show, close }) {
	const [removeClasses, addClasses] = status === 'show' ? [close, show] : [show, close]

	$dialog.classList.remove(...removeClasses)
	$dialog.classList.add(...addClasses)
}

function dispatchDialogEvent($dialog, event: Status | string, detail = {}) {
	$dialog.dispatchEvent(new CustomEvent(`dialog:${event}`, { detail }))
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

export default ($dialog, options: Options = {}) => {
	if (!$dialog) throw new Error('Dialog not found.')

	const { classes = {}, locked, overlay = 'overlay' } = options

	const $overlay = $dialog.querySelector(`.${overlay}`) || document.querySelector(`.${overlay}`)

	const fmtClasses = {
		show: [classes.show].flat().filter(name => !!name),
		close: [classes.close].flat().filter(name => !!name),
	}

	const dialog = new Proxy(
		{ status: 'close' },
		{
			set(obj, prop, value) {
				if (prop !== 'status' || !['show', 'close'].includes(value)) return false

				toggleHidden($dialog, value)
				toggleHidden($overlay, value)

				value === 'show' ? disableBodyScroll($dialog) : enableBodyScroll($dialog)

				toggleDialogClass($dialog, value, fmtClasses)
				dispatchDialogEvent($dialog, value)

				if (!locked) {
					toggleEventBind($overlay, 'click', value, handler.close)
					toggleEventBind(document, 'keydown', value, escCheck)
				}

				obj[prop] = value
				return true
			},
		}
	)

	const handler = {
		show: () => (dialog.status = 'show'),
		close: () => (dialog.status = 'close'),
	}

	const escCheck = ({ key }) => key === 'Escape' && handler.close()

	aria()
		.findAll('controls', $dialog.id)
		.forEach($control => $control.addEventListener('click', handler.show))

	$dialog.addEventListener('click', ({ target }) => {
		const { dialogEvent } = (target as HTMLElement).dataset
		if (!dialogEvent) return

		dialogEvent === 'close'
			? handler.close()
			: dispatchDialogEvent($dialog, dialogEvent, { dialog: { close: handler.close } })
	})

	return handler
}
