import role from '../utils/role'
import aria from '../utils/aria'

const switchTabpanel = ($tab, isHidden) =>
	aria($tab)
		.toggle('selected')
		.controlTarget()
		.hidden = isHidden


export default $tablist => {
	role($tablist).delegate('tab', 'selected', ($prevTab, $nextTab) => {
		switchTabpanel($prevTab, true)
		switchTabpanel($nextTab, false)
	})
}
