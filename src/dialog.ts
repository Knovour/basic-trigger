import { toggleActiveClasses, send } from './utils'
import aria from './utils/aria'

const isBackdropClicked = ($dialog: HTMLDialogElement, { clientX, clientY }) => {
	const { left, top, right, bottom } = $dialog.getBoundingClientRect()
	return left > clientX || right < clientX || top > clientY || bottom < clientY
}

const defaultEvent = ['cancel', 'close']

const customEvent = {
	show: 'dialog:show',
}

export function bind($dialog: HTMLDialogElement) {
	const { activeClass, unactiveClass } = $dialog.dataset

	aria()
		.findAll('controls', $dialog.id)
		.forEach($control =>
			$control.addEventListener('click', () => {
				$dialog.showModal()
				toggleActiveClasses($dialog, unactiveClass, activeClass)
			})
		)

	const observer = new MutationObserver(mutations =>
		mutations.forEach(({ attributeName }) => {
			if (attributeName === 'open' && $dialog.open) send($dialog, customEvent.show)
		})
	)

	observer.observe($dialog, { attributeFilter: ['open'] })

	$dialog.addEventListener('click', e => {
		const $target = e.target as HTMLElement
		if ($target.tagName === 'DIALOG' && isBackdropClicked($dialog, e)) return $dialog.close()

		const { dialogEvent } = $target.dataset
		if (!dialogEvent) return

		dialogEvent === 'close' ? $dialog.close() : send($dialog, `dialog:${dialogEvent}`)
	})

	defaultEvent.forEach(eventName =>
		$dialog.addEventListener(eventName, () => toggleActiveClasses($dialog, activeClass, unactiveClass))
	)
}
