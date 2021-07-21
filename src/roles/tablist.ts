import role from '../utils/role'
import aria from '../utils/aria'

function switchTabpanel($tab, isHidden) {
	aria($tab).toggle('selected').controlTarget().hidden = isHidden
}

function dispatchTabEvent($tablist, detail) {
	$tablist.dispatchEvent(new CustomEvent('tab:selected', { detail }))
}

export default $tablist => {
	$tablist.addEventListener('click', ({ target }) => {
		if (role(target).name !== 'tab' || aria(target).is('selected')) return

		const $prevTab = aria($tablist).find('selected', true)

		switchTabpanel($prevTab, true)
		switchTabpanel(target, false)

		dispatchTabEvent($tablist, {
			$tab: target,
			$panel: aria(target).controlTarget(),
		})
	})
}
