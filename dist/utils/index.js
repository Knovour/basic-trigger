function toggleActiveClasses($target, fromClasses, toClasses) {
  fromClasses && $target.classList.remove(...fromClasses.split(" "));
  toClasses && $target.classList.add(...toClasses.split(" "));
}
function send($target, eventName, detail) {
  const eventDetail = detail ? new CustomEvent(eventName, { detail }) : new CustomEvent(eventName);
  $target.dispatchEvent(eventDetail);
}
function bindOnload(query, bindFn) {
  window.addEventListener("load", () => document.querySelectorAll(query).forEach(bindFn));
}
export {
  bindOnload,
  send,
  toggleActiveClasses
};
