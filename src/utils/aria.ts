const aria = ($elem = document.body) => ({
	get(name) {
		return $elem.getAttribute(`aria-${name}`)
	},
	set(name, value) {
		return $elem.setAttribute(`aria-${name}`, value)
	},
	find(name, value?) {
		return value ? $elem.querySelector(`[aria-${name}=${value}]`) : $elem.querySelector(`[aria-${name}]`)
	},
	findAll(name, value?) {
		return value ? $elem.querySelectorAll(`[aria-${name}=${value}]`) : $elem.querySelectorAll(`[aria-${name}]`)
	},
	controlTarget() {
		return document.getElementById(aria($elem).get('controls'))
	},
	is(status) {
		return $elem.getAttribute(`aria-${status}`) === 'true'
	},
	toggle(name) {
		aria($elem).set(name, aria($elem).get(name) !== 'true')
		return aria($elem)
	},
})

export default aria
