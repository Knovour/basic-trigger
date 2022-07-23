type Role = {
	name: string
	is(status: string): boolean
}

export default function role($roleElem: HTMLElement): Role {
	return {
		name: $roleElem.getAttribute('role'),
		is: name => role($roleElem).name === name,
	}
}
