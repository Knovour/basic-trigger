import { send } from './utils'

const customEvent = {
	change: 'checklist:change',
}

export function bind($checklist: HTMLElement) {
	$checklist.addEventListener('click', ({ target }) => {
		if ((target as HTMLInputElement).type !== 'checkbox') return

		const { value, checked } = target as HTMLInputElement
		send($checklist, customEvent.change, { value, checked })
	})
}
