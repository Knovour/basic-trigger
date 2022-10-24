export function toggleActiveClasses($target: HTMLElement, fromClasses?: string, toClasses?: string) {
	fromClasses && $target.classList.remove(...fromClasses.split(' '))
	toClasses && $target.classList.add(...toClasses.split(' '))
}

export function send($target: HTMLElement, eventName: string, detail?: any) {
	const eventDetail = detail ? new CustomEvent(eventName, { detail }) : new CustomEvent(eventName)
	$target.dispatchEvent(eventDetail)
}
