import { toggleActiveClasses, send } from './utils'
import role from './utils/role'
import aria from './utils/aria'

function switchTabpanel($tab: HTMLElement, isHidden: boolean) {
	aria($tab).toggle('selected').controlTarget().hidden = isHidden
}

const customEvent = {
	selected: 'tab:selected',
}

export function bind($tablist) {
	$tablist.addEventListener('click', ({ target }) => {
		if (role(target).name !== 'tab' || aria(target).is('selected')) return

		const $prevTab = aria($tablist).find('selected', true)

		switchTabpanel($prevTab, true)
		switchTabpanel(target, false)

		toggleActiveClasses($prevTab, $tablist.dataset.activeClass, $tablist.dataset.unactiveClass)
		toggleActiveClasses(target, $tablist.dataset.unactiveClass, $tablist.dataset.activeClass)

		send($tablist, customEvent.selected, {
			$tab: target,
			$panel: aria(target).controlTarget(),
		})
	})
}
