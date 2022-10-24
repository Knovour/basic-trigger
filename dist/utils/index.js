function toggleActiveClasses($target, fromClasses, toClasses) {
  fromClasses && $target.classList.remove(...fromClasses.split(" "));
  toClasses && $target.classList.add(...toClasses.split(" "));
}
function send($target, eventName, detail) {
  const eventDetail = detail ? new CustomEvent(eventName, { detail }) : new CustomEvent(eventName);
  $target.dispatchEvent(eventDetail);
}
export {
  send,
  toggleActiveClasses
};
