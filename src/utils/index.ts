export function toggleActiveClasses($target: HTMLElement, fromClasses?: string, toClasses?: string) {
	fromClasses && $target.classList.remove(...fromClasses.split(' '))
	toClasses && $target.classList.add(...toClasses.split(' '))
}

export function send($target: HTMLElement, eventName: string, detail?: any) {
	const eventDetail = detail ? new CustomEvent(eventName, { detail }) : new CustomEvent(eventName)
	$target.dispatchEvent(eventDetail)
}

export function bindOnload(query: string, bindFn: ($target: HTMLElement) => void) {
	window.addEventListener('load', () => document.querySelectorAll(query).forEach(bindFn))
}
