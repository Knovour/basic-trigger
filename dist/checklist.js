import { bindOnload, send } from "./utils/index.js";
const customEvent = {
  change: "checklist:change"
};
function bind($checklist) {
  $checklist.addEventListener("click", ({ target }) => {
    if (target.type !== "checkbox")
      return;
    const { value, checked } = target;
    send($checklist, customEvent.change, { value, checked });
  });
}
bindOnload('[role="checklist"]', bind);
