'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var aria$1 = require('../../../../utils/dom/aria.js');
var event = require('../../../../utils/dom/event.js');
var aria = require('../../../../constants/aria.js');

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class SubMenu {
  constructor(parent, domNode) {
    this.parent = parent;
    this.domNode = domNode;
    __publicField(this, "subMenuItems");
    __publicField(this, "subIndex", 0);
    this.subIndex = 0;
    this.init();
  }
  init() {
    this.subMenuItems = this.domNode.querySelectorAll("li");
    this.addListeners();
  }
  gotoSubIndex(idx) {
    if (idx === this.subMenuItems.length) {
      idx = 0;
    } else if (idx < 0) {
      idx = this.subMenuItems.length - 1;
    }
    this.subMenuItems[idx].focus();
    this.subIndex = idx;
  }
  addListeners() {
    const parentNode = this.parent.domNode;
    Array.prototype.forEach.call(this.subMenuItems, (el) => {
      el.addEventListener("keydown", (event$1) => {
        const code = event.getEventCode(event$1);
        let prevDef = false;
        switch (code) {
          case aria.EVENT_CODE.down: {
            this.gotoSubIndex(this.subIndex + 1);
            prevDef = true;
            break;
          }
          case aria.EVENT_CODE.up: {
            this.gotoSubIndex(this.subIndex - 1);
            prevDef = true;
            break;
          }
          case aria.EVENT_CODE.tab: {
            aria$1.triggerEvent(parentNode, "mouseleave");
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
          event$1.stopPropagation();
        }
        return false;
      });
    });
  }
}

exports.default = SubMenu;
//# sourceMappingURL=submenu.js.map
