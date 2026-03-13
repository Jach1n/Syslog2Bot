'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var submenu = require('./submenu.js');
var event = require('../../../../utils/dom/event.js');
var aria = require('../../../../constants/aria.js');
var aria$1 = require('../../../../utils/dom/aria.js');

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
      this.submenu = new submenu.default(this, menuChild);
    }
    this.addListeners();
  }
  addListeners() {
    this.domNode.addEventListener("keydown", (event$1) => {
      const code = event.getEventCode(event$1);
      let prevDef = false;
      switch (code) {
        case aria.EVENT_CODE.down: {
          aria$1.triggerEvent(event$1.currentTarget, "mouseenter");
          this.submenu && this.submenu.gotoSubIndex(0);
          prevDef = true;
          break;
        }
        case aria.EVENT_CODE.up: {
          aria$1.triggerEvent(event$1.currentTarget, "mouseenter");
          this.submenu && this.submenu.gotoSubIndex(this.submenu.subMenuItems.length - 1);
          prevDef = true;
          break;
        }
        case aria.EVENT_CODE.tab: {
          aria$1.triggerEvent(event$1.currentTarget, "mouseleave");
          break;
        }
        case aria.EVENT_CODE.enter:
        case aria.EVENT_CODE.numpadEnter:
        case aria.EVENT_CODE.space: {
          prevDef = true;
          event$1.currentTarget.click();
          break;
        }
      }
      if (prevDef) {
        event$1.preventDefault();
      }
    });
  }
}

exports.default = MenuItem;
//# sourceMappingURL=menu-item.js.map
