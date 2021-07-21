import aria from '../utils/aria'

export default $btn => {
	const status = new Proxy(
		{ pressed: false },
		{
			set(obj, prop, value) {
				if (prop !== 'pressed' || typeof value !== 'boolean') return false

				aria($btn).set('pressed', value)

				const toggle = value
					? { unpressed: () => (status.pressed = false) }
					: { pressed: () => (status.pressed = true) }

				const event = value ? 'pressed' : 'unpressed'
				$btn.dispatchEvent(new CustomEvent(`button:${event}`, { detail: { button: toggle } }))

				obj[prop] = value
				return true
			},
		}
	)

	$btn.addEventListener('click', ({ target }) => (status.pressed = !(aria(target).get('pressed') === 'true')))
}
