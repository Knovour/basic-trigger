import { bindOnload, toggleActiveClasses, send } from "./utils/index.js";
import role from "./utils/role.js";
import aria from "./utils/aria.js";
function switchTabpanel($tab, isHidden) {
  aria($tab).toggle("selected").controlTarget().hidden = isHidden;
}
const customEvent = {
  selected: "tab:selected"
};
function bind($tablist) {
  $tablist.addEventListener("click", ({ target }) => {
    if (role(target).name !== "tab" || aria(target).is("selected"))
      return;
    const $prevTab = aria($tablist).find("selected", true);
    switchTabpanel($prevTab, true);
    switchTabpanel(target, false);
    toggleActiveClasses($prevTab, $tablist.dataset.activeClass, $tablist.dataset.unactiveClass);
    toggleActiveClasses(target, $tablist.dataset.unactiveClass, $tablist.dataset.activeClass);
    send($tablist, customEvent.selected, {
      $tab: target,
      $panel: aria(target).controlTarget()
    });
  });
}
bindOnload('[role="tablist"]', bind);
