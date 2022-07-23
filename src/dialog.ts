import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import { toggleActiveClasses, send, bindOnload } from './utils'
import aria from './utils/aria'

const isBackdropClicked = ($dialog: HTMLDialogElement, { clientX, clientY }) => {
	const { left, top, right, bottom } = $dialog.getBoundingClientRect()
	return left > clientX || right < clientX || top > clientY || bottom < clientY
}

const defaultEvent = ['cancel', 'close']

const customEvent = {
	show: 'dialog:show',
}

function bind($dialog: HTMLDialogElement) {
	const { activeClass, unactiveClass } = $dialog.dataset

	aria()
		.findAll('controls', $dialog.id)
		.forEach($control =>
			$control.addEventListener('click', () => {
				$dialog.showModal()
				toggleActiveClasses($dialog, unactiveClass, activeClass)
				send($dialog, customEvent.show)
				disableBodyScroll($dialog)
			})
		)

	$dialog.addEventListener('click', e => {
		if (isBackdropClicked($dialog, e)) return $dialog.close()

		const { dialogEvent } = (e.target as HTMLElement).dataset
		if (!dialogEvent) return

		dialogEvent === 'close' ? $dialog.close() : send($dialog, `dialog:${dialogEvent}`)
	})

	defaultEvent.forEach(eventName =>
		$dialog.addEventListener(eventName, () => {
			toggleActiveClasses($dialog, activeClass, unactiveClass)
			enableBodyScroll($dialog)
		})
	)
}

bindOnload('dialog', bind)
