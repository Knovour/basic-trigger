const getAriaQuery = (name: string, value?: string) => (value ? `[aria-${name}=${value}]` : `[aria-${name}]`)

type Aria = {
	get(name: string): string
	set(name: string, value: any): void
	find(name: string, value?: any): HTMLElement
	findAll(name: string, value?: any): NodeListOf<HTMLElement>
	controlTarget(): HTMLElement
	is(status: string): boolean
	toggle(name: string): Aria
}

export default function aria($elem = document.body): Aria {
	return {
		get(name) {
			return $elem.getAttribute(`aria-${name}`)
		},
		set(name, value) {
			return $elem.setAttribute(`aria-${name}`, value)
		},
		find(name, value) {
			return $elem.querySelector(getAriaQuery(name, value))
		},
		findAll(name, value) {
			return $elem.querySelectorAll(getAriaQuery(name, value))
		},
		controlTarget() {
			return document.getElementById(aria($elem).get('controls'))
		},
		is(status): boolean {
			return $elem.getAttribute(`aria-${status}`) === 'true'
		},
		toggle(name) {
			aria($elem).set(name, aria($elem).get(name) !== 'true')
			return aria($elem)
		},
	}
}
