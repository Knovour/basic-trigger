function role($roleElem) {
  return {
    name: $roleElem.getAttribute("role"),
    is: (name) => role($roleElem).name === name
  };
}
export {
  role as default
};
