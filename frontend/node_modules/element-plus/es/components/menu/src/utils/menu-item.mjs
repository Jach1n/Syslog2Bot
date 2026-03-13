import SubMenu from './submenu.mjs';
import { getEventCode } from '../../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../../constants/aria.mjs';
import { triggerEvent } from '../../../../utils/dom/aria.mjs';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class MenuItem {
  constructor(domNode, namespace) {
    this.domNode = domNode;
    __publicField(this, "submenu", null);
    this.submenu = null;
    this.init(namespace);
  }
  init(namespace) {
    this.domNode.setAttribute("tabindex", "0");
    const menuChild = this.domNode.querySelector(`.${namespace}-menu`);
    if (menuChild) {
      this.submenu = new SubMenu(this, menuChild);
    }
    this.addListeners();
  }
  addListeners() {
    this.domNode.addEventListener("keydown", (event) => {
      const code = getEventCode(event);
      let prevDef = false;
      switch (code) {
        case EVENT_CODE.down: {
          triggerEvent(event.currentTarget, "mouseenter");
          this.submenu && this.submenu.gotoSubIndex(0);
          prevDef = true;
          break;
        }
        case EVENT_CODE.up: {
          triggerEvent(event.currentTarget, "mouseenter");
          this.submenu && this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1);
          prevDef = true;
          break;
        }
        case EVENT_CODE.tab: {
          triggerEvent(event.currentTarget, "mouseleave");
          break;
        }
        case EVENT_CODE.enter:
        case EVENT_CODE.numpadEnter:
        case EVENT_CODE.space: {
          prevDef = true;
          event.currentTarget.click();
          break;
        }
      }
      if (prevDef) {
        event.preventDefault();
      }
    });
  }
}

export { MenuItem as default };
//# sourceMappingURL=menu-item.mjs.map
