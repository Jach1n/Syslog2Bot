import { notificationEmits, notificationProps } from './notification.mjs';
import { defineComponent, ref, computed, onMounted, createBlock, openBlock, Transition, unref, withCtx, withDirectives, createElementVNode, normalizeStyle, normalizeClass, createCommentVNode, resolveDynamicComponent, toDisplayString, renderSlot, createElementBlock, Fragment, vShow, withModifiers } from 'vue';
import { useEventListener, useTimeoutFn } from '@vueuse/core';
import { ElIcon } from '../../icon/index.mjs';
import { useGlobalComponentSettings } from '../../config-provider/src/hooks/use-global-config.mjs';
import { TypeComponentsMap } from '../../../utils/vue/icon.mjs';
import { getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

const _hoisted_1 = ["id"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ["innerHTML"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElNotification"
  },
  __name: "notification",
  props: notificationProps,
  emits: notificationEmits,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { ns, zIndex } = useGlobalComponentSettings("notification");
    const { nextZIndex, currentZIndex } = zIndex;
    const visible = ref(false);
    let timer = void 0;
    const typeClass = computed(() => {
      const type = props.type;
      return type && TypeComponentsMap[props.type] ? ns.m(type) : "";
    });
    const iconComponent = computed(() => {
      if (!props.type) return props.icon;
      return TypeComponentsMap[props.type] || props.icon;
    });
    const horizontalClass = computed(
      () => props.position.endsWith("right") ? "right" : "left"
    );
    const verticalProperty = computed(
      () => props.position.startsWith("top") ? "top" : "bottom"
    );
    const positionStyle = computed(() => {
      var _a;
      return {
        [verticalProperty.value]: `${props.offset}px`,
        zIndex: (_a = props.zIndex) != null ? _a : currentZIndex.value
      };
    });
    function startTimer() {
      if (props.duration > 0) {
        ({ stop: timer } = useTimeoutFn(() => {
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
    function onKeydown(event) {
      const code = getEventCode(event);
      switch (code) {
        case EVENT_CODE.delete:
        case EVENT_CODE.backspace:
          clearTimer();
          break;
        case EVENT_CODE.esc:
          if (visible.value) {
            close();
          }
          break;
        default:
          startTimer();
          break;
      }
    }
    onMounted(() => {
      startTimer();
      nextZIndex();
      visible.value = true;
    });
    useEventListener(document, "keydown", onKeydown);
    __expose({
      visible,
      /** @description close notification */
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        onBeforeLeave: __props.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            id: __props.id,
            class: normalizeClass([unref(ns).b(), __props.customClass, horizontalClass.value]),
            style: normalizeStyle(positionStyle.value),
            role: "alert",
            onMouseenter: clearTimer,
            onMouseleave: startTimer,
            onClick: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => __props.onClick && __props.onClick(...args))
          }, [
            iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass([unref(ns).e("icon"), typeClass.value])
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])) : createCommentVNode("v-if", true),
            createElementVNode(
              "div",
              {
                class: normalizeClass(unref(ns).e("group"))
              },
              [
                createElementVNode("h2", {
                  class: normalizeClass(unref(ns).e("title")),
                  textContent: toDisplayString(__props.title)
                }, null, 10, _hoisted_2),
                withDirectives(createElementVNode(
                  "div",
                  {
                    class: normalizeClass(unref(ns).e("content")),
                    style: normalizeStyle(!!__props.title ? void 0 : { margin: 0 })
                  },
                  [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      !__props.dangerouslyUseHTMLString ? (openBlock(), createElementBlock(
                        "p",
                        _hoisted_3,
                        toDisplayString(__props.message),
                        1
                        /* TEXT */
                      )) : (openBlock(), createElementBlock(
                        Fragment,
                        { key: 1 },
                        [
                          createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                          createElementVNode("p", { innerHTML: __props.message }, null, 8, _hoisted_4)
                        ],
                        2112
                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                      ))
                    ])
                  ],
                  6
                  /* CLASS, STYLE */
                ), [
                  [vShow, __props.message]
                ]),
                __props.showClose ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass(unref(ns).e("closeBtn")),
                  onClick: withModifiers(close, ["stop"])
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon)))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class"])) : createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], 46, _hoisted_1), [
            [vShow, visible.value]
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=notification.vue2.mjs.map
