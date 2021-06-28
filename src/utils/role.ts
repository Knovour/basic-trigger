import aria from './aria'

const roleEvents = {
	radiogroup: 'toggle',
	tablist: 'toggle'
}

const dispatchEvent = ($currentRole, $target) => {
	const customEvent = new CustomEvent(
		$currentRole.dataset.event || roleEvents[role($currentRole).name],
		{ detail: { $target } }
	)
	$currentRole.dispatchEvent(customEvent)
}

export default function role ($roleElem) {
	return {
		is: name => role($roleElem).name === name,
		name: $roleElem.getAttribute('role'),
		prevTarget: name => $roleElem.querySelector(`[aria-${name}=true]`),
		delegate (subrole, status, callback) {
			$roleElem.addEventListener('click', ({ target }) => {
				if (role(target).name !== subrole || aria(target).is(status)) return

				callback(role($roleElem).prevTarget(status), target)
				dispatchEvent($roleElem, target)
			})
		},
		listen (callback) {
			$roleElem.addEventListener('click', ({ target }) =>
				dispatchEvent($roleElem, target)
			)
		}
	}
}
