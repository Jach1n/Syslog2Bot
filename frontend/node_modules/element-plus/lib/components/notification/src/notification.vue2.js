'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var notification = require('./notification.js');
var vue = require('vue');
var core = require('@vueuse/core');
var index = require('../../icon/index.js');
var useGlobalConfig = require('../../config-provider/src/hooks/use-global-config.js');
var icon = require('../../../utils/vue/icon.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

const _hoisted_1 = ["id"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ["innerHTML"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElNotification"
  },
  __name: "notification",
  props: notification.notificationProps,
  emits: notification.notificationEmits,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { ns, zIndex } = useGlobalConfig.useGlobalComponentSettings("notification");
    const { nextZIndex, currentZIndex } = zIndex;
    const visible = vue.ref(false);
    let timer = void 0;
    const typeClass = vue.computed(() => {
      const type = props.type;
      return type && icon.TypeComponentsMap[props.type] ? ns.m(type) : "";
    });
    const iconComponent = vue.computed(() => {
      if (!props.type) return props.icon;
      return icon.TypeComponentsMap[props.type] || props.icon;
    });
    const horizontalClass = vue.computed(
      () => props.position.endsWith("right") ? "right" : "left"
    );
    const verticalProperty = vue.computed(
      () => props.position.startsWith("top") ? "top" : "bottom"
    );
    const positionStyle = vue.computed(() => {
      var _a;
      return {
        [verticalProperty.value]: `${props.offset}px`,
        zIndex: (_a = props.zIndex) != null ? _a : currentZIndex.value
      };
    });
    function startTimer() {
      if (props.duration > 0) {
        ({ stop: timer } = core.useTimeoutFn(() => {
          if (visible.value) close();
        }, props.duration));
      }
    }
    function clearTimer() {
      timer == null ? void 0 : timer();
    }
    function close() {
      visible.value = false;
    }
    function onKeydown(event$1) {
      const code = event.getEventCode(event$1);
      switch (code) {
        case aria.EVENT_CODE.delete:
        case aria.EVENT_CODE.backspace:
          clearTimer();
          break;
        case aria.EVENT_CODE.esc:
          if (visible.value) {
            close();
          }
          break;
        default:
          startTimer();
          break;
      }
    }
    vue.onMounted(() => {
      startTimer();
      nextZIndex();
      visible.value = true;
    });
    core.useEventListener(document, "keydown", onKeydown);
    __expose({
      visible,
      /** @description close notification */
      close
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: vue.unref(ns).b("fade"),
        onBeforeLeave: __props.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("div", {
            id: __props.id,
            class: vue.normalizeClass([vue.unref(ns).b(), __props.customClass, horizontalClass.value]),
            style: vue.normalizeStyle(positionStyle.value),
            role: "alert",
            onMouseenter: clearTimer,
            onMouseleave: startTimer,
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => __props.onClick && __props.onClick(...args))
          }, [
            iconComponent.value ? (vue.openBlock(), vue.createBlock(vue.unref(index.ElIcon), {
              key: 0,
              class: vue.normalizeClass([vue.unref(ns).e("icon"), typeClass.value])
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(iconComponent.value)))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(vue.unref(ns).e("group"))
              },
              [
                vue.createElementVNode("h2", {
                  class: vue.normalizeClass(vue.unref(ns).e("title")),
                  textContent: vue.toDisplayString(__props.title)
                }, null, 10, _hoisted_2),
                vue.withDirectives(vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass(vue.unref(ns).e("content")),
                    style: vue.normalizeStyle(!!__props.title ? void 0 : { margin: 0 })
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      !__props.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock(
                        "p",
                        _hoisted_3,
                        vue.toDisplayString(__props.message),
                        1
                        /* TEXT */
                      )) : (vue.openBlock(), vue.createElementBlock(
                        vue.Fragment,
                        { key: 1 },
                        [
                          vue.createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                          vue.createElementVNode("p", { innerHTML: __props.message }, null, 8, _hoisted_4)
                        ],
                        2112
                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                      ))
                    ])
                  ],
                  6
                  /* CLASS, STYLE */
                ), [
                  [vue.vShow, __props.message]
                ]),
                __props.showClose ? (vue.openBlock(), vue.createBlock(vue.unref(index.ElIcon), {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns).e("closeBtn")),
                  onClick: vue.withModifiers(close, ["stop"])
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.closeIcon)))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], 46, _hoisted_1), [
            [vue.vShow, visible.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=notification.vue2.js.map
