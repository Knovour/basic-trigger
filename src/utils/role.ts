const role = $roleElem => ({
	is: name => role($roleElem).name === name,
	name: $roleElem.getAttribute('role'),
})

export default role
