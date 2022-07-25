const getAriaQuery = (name, value) => value ? `[aria-${name}=${value}]` : `[aria-${name}]`;
function aria($elem = document.body) {
  return {
    get(name) {
      return $elem.getAttribute(`aria-${name}`);
    },
    set(name, value) {
      return $elem.setAttribute(`aria-${name}`, value);
    },
    find(name, value) {
      return $elem.querySelector(getAriaQuery(name, value));
    },
    findAll(name, value) {
      return $elem.querySelectorAll(getAriaQuery(name, value));
    },
    controlTarget() {
      return document.getElementById(aria($elem).get("controls"));
    },
    is(status) {
      return $elem.getAttribute(`aria-${status}`) === "true";
    },
    toggle(name) {
      aria($elem).set(name, aria($elem).get(name) !== "true");
      return aria($elem);
    }
  };
}
export {
  aria as default
};
