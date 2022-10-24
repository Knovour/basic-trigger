import { bindOnload } from "./utils/index.js";
import { bind as bind$1 } from "./checklist.js";
import { bind as bind$2 } from "./dialog.js";
import { bind as bind$3 } from "./pressButton.js";
import { bind as bind$4 } from "./tablist.js";
const targets = {
  checklist: ['[role="checklist"]', bind$1],
  dialog: ["dialog", bind$2],
  pressButton: ["[aria-pressed]", bind$3],
  tablist: ['[role="tablist"]', bind$4]
};
function bind(key) {
  if (!(key in targets))
    return;
  const [selector, bindElem] = targets[key];
  bindOnload(selector, bindElem);
}
function bindAll() {
  Object.keys(targets).forEach(bind);
}
export {
  bind,
  bindAll
};
