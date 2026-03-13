'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var menuItem = require('./menu-item.js');
var vue = require('vue');
var index$1 = require('../../tooltip/index.js');
var useMenu = require('./use-menu.js');
var tokens = require('./tokens.js');
var types = require('../../../utils/types.js');
var error = require('../../../utils/error.js');
var index = require('../../../hooks/use-namespace/index.js');

const COMPONENT_NAME = "ElMenuItem";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "menu-item",
  props: menuItem.menuItemProps,
  emits: menuItem.menuItemEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    types.isPropAbsent(props.index) && error.debugWarn(COMPONENT_NAME, 'Missing required prop: "index"');
    const instance = vue.getCurrentInstance();
    const rootMenu = vue.inject(tokens.MENU_INJECTION_KEY);
    const nsMenu = index.useNamespace("menu");
    const nsMenuItem = index.useNamespace("menu-item");
    if (!rootMenu) error.throwError(COMPONENT_NAME, "can not inject root menu");
    const { parentMenu, indexPath } = useMenu.default(instance, vue.toRef(props, "index"));
    const subMenu = vue.inject(
      `${tokens.SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`
    );
    if (!subMenu) error.throwError(COMPONENT_NAME, "can not inject sub menu");
    const active = vue.computed(() => props.index === rootMenu.activeIndex);
    const item = vue.reactive({
      index: props.index,
      indexPath,
      active
    });
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        });
        emit("click", item);
      }
    };
    vue.onMounted(() => {
      subMenu.addSubMenu(item);
      rootMenu.addMenuItem(item);
    });
    vue.onBeforeUnmount(() => {
      subMenu.removeSubMenu(item);
      rootMenu.removeMenuItem(item);
    });
    __expose({
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "li",
        {
          class: vue.normalizeClass([
            vue.unref(nsMenuItem).b(),
            vue.unref(nsMenuItem).is("active", active.value),
            vue.unref(nsMenuItem).is("disabled", __props.disabled)
          ]),
          role: "menuitem",
          tabindex: "-1",
          onClick: handleClick
        },
        [
          vue.unref(parentMenu).type.name === "ElMenu" && vue.unref(rootMenu).props.collapse && _ctx.$slots.title ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElTooltip), {
            key: 0,
            effect: vue.unref(rootMenu).props.popperEffect,
            placement: "right",
            "fallback-placements": ["left"],
            "popper-class": vue.unref(rootMenu).props.popperClass,
            "popper-style": vue.unref(rootMenu).props.popperStyle,
            persistent: vue.unref(rootMenu).props.persistent,
            "focus-on-target": ""
          }, {
            content: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "title")
            ]),
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(nsMenu).be("tooltip", "trigger"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              )
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["effect", "popper-class", "popper-style", "persistent"])) : (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 1 },
            [
              vue.renderSlot(_ctx.$slots, "default"),
              vue.renderSlot(_ctx.$slots, "title")
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=menu-item.vue2.js.map
