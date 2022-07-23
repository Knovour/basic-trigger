import { send, bindOnload } from './utils'

const customEvent = {
	change: 'checklist:change',
}

function bind($checklist: HTMLElement) {
	$checklist.addEventListener('click', ({ target }) => {
		if ((target as HTMLInputElement).type !== 'checkbox') return

		const { value, checked } = target as HTMLInputElement
		send($checklist, customEvent.change, { value, checked })
	})
}

bindOnload('[role="checklist"]', bind)
