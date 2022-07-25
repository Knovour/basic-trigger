import { bindOnload, toggleActiveClasses, send } from "./utils/index.js";
import aria from "./utils/aria.js";
const isBackdropClicked = ($dialog, { clientX, clientY }) => {
  const { left, top, right, bottom } = $dialog.getBoundingClientRect();
  return left > clientX || right < clientX || top > clientY || bottom < clientY;
};
const defaultEvent = ["cancel", "close"];
const customEvent = {
  show: "dialog:show"
};
function bind($dialog) {
  const { activeClass, unactiveClass } = $dialog.dataset;
  aria().findAll("controls", $dialog.id).forEach(($control) => $control.addEventListener("click", () => {
    $dialog.showModal();
    toggleActiveClasses($dialog, unactiveClass, activeClass);
    send($dialog, customEvent.show);
  }));
  $dialog.addEventListener("click", (e) => {
    if (isBackdropClicked($dialog, e))
      return $dialog.close();
    const { dialogEvent } = e.target.dataset;
    if (!dialogEvent)
      return;
    dialogEvent === "close" ? $dialog.close() : send($dialog, `dialog:${dialogEvent}`);
  });
  defaultEvent.forEach((eventName) => $dialog.addEventListener(eventName, () => toggleActiveClasses($dialog, activeClass, unactiveClass)));
}
bindOnload("dialog", bind);
