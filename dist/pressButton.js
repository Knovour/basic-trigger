import { toggleActiveClasses, send } from "./utils/index.js";
import aria from "./utils/aria.js";
const customEvent = {
  pressed: "btn:pressed",
  unpressed: "btn:unpressed"
};
function bind($btn) {
  $btn.addEventListener("click", () => {
    const $ariaBtn = aria($btn);
    const nextPressedStatus = $ariaBtn.get("pressed") !== "true";
    $ariaBtn.set("pressed", nextPressedStatus);
    nextPressedStatus ? toggleActiveClasses($btn, $btn.dataset.unactiveClass, $btn.dataset.activeClass) : toggleActiveClasses($btn, $btn.dataset.activeClass, $btn.dataset.unactiveClass);
    send($btn, nextPressedStatus ? customEvent.pressed : customEvent.unpressed);
  });
}
export {
  bind
};
