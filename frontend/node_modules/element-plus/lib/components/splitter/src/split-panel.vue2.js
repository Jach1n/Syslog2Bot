'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splitPanel = require('./split-panel.js');
var vue = require('vue');
var usePanel = require('./hooks/usePanel.js');
var splitBar_vue_vue_type_script_setup_true_lang = require('./split-bar.vue2.js');
var type = require('./type.js');
var useSize = require('./hooks/useSize.js');
var index = require('../../../hooks/use-namespace/index.js');
var error = require('../../../utils/error.js');

const COMPONENT_NAME = "ElSplitterPanel";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "split-panel",
  props: splitPanel.splitterPanelProps,
  emits: splitPanel.splitterPanelEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const ns = index.useNamespace("splitter-panel");
    const props = __props;
    const emits = __emit;
    const splitterContext = vue.inject(type.splitterRootContextKey);
    if (!splitterContext)
      error.throwError(
        COMPONENT_NAME,
        "usage: <el-splitter><el-splitter-panel /></el-splitter/>"
      );
    const { panels, layout, lazy, containerSize, pxSizes } = vue.toRefs(splitterContext);
    const {
      registerPanel,
      unregisterPanel,
      onCollapse,
      onMoveEnd,
      onMoveStart,
      onMoving
    } = splitterContext;
    const panelEl = vue.ref();
    const instance = vue.getCurrentInstance();
    const uid = instance.uid;
    const index$1 = vue.ref(0);
    const panel = vue.computed(() => panels.value[index$1.value]);
    const setIndex = (val) => {
      index$1.value = val;
    };
    const panelSize = vue.computed(() => {
      var _a;
      if (!panel.value) return 0;
      return (_a = pxSizes.value[index$1.value]) != null ? _a : 0;
    });
    const nextSize = vue.computed(() => {
      var _a;
      if (!panel.value) return 0;
      return (_a = pxSizes.value[index$1.value + 1]) != null ? _a : 0;
    });
    const nextPanel = vue.computed(() => {
      if (panel.value) {
        return panels.value[index$1.value + 1];
      }
      return null;
    });
    const isResizable = vue.computed(() => {
      var _a;
      if (!nextPanel.value) return false;
      return props.resizable && ((_a = nextPanel.value) == null ? void 0 : _a.resizable) && // If it is 0, it means it is collapsed => check if the minimum value is set
      (panelSize.value !== 0 || !props.min) && (nextSize.value !== 0 || !nextPanel.value.min);
    });
    const isShowBar = vue.computed(() => {
      if (!panel.value) return false;
      return index$1.value !== panels.value.length - 1;
    });
    const startCollapsible = vue.computed(
      () => usePanel.isCollapsible(panel.value, panelSize.value, nextPanel.value, nextSize.value)
    );
    const endCollapsible = vue.computed(
      () => usePanel.isCollapsible(nextPanel.value, nextSize.value, panel.value, panelSize.value)
    );
    function sizeToPx(str) {
      if (useSize.isPct(str)) {
        return useSize.getPct(str) * containerSize.value || 0;
      } else if (useSize.isPx(str)) {
        return useSize.getPx(str);
      }
      return str != null ? str : 0;
    }
    let isSizeUpdating = false;
    vue.watch(
      () => props.size,
      () => {
        if (!isSizeUpdating && panel.value) {
          if (!containerSize.value) {
            panel.value.size = props.size;
            return;
          }
          const size = sizeToPx(props.size);
          const maxSize = sizeToPx(props.max);
          const minSize = sizeToPx(props.min);
          const finalSize = Math.min(Math.max(size, minSize || 0), maxSize || size);
          if (finalSize !== size) {
            emits("update:size", finalSize);
          }
          panel.value.size = finalSize;
        }
      }
    );
    vue.watch(
      () => {
        var _a;
        return (_a = panel.value) == null ? void 0 : _a.size;
      },
      (val) => {
        if (val !== props.size) {
          isSizeUpdating = true;
          emits("update:size", val);
          vue.nextTick(() => isSizeUpdating = false);
        }
      }
    );
    vue.watch(
      () => props.resizable,
      (val) => {
        if (panel.value) {
          panel.value.resizable = val;
        }
      }
    );
    const _panel = vue.reactive({
      uid,
      getVnode: () => instance.vnode,
      setIndex,
      ...props,
      collapsible: vue.computed(() => usePanel.getCollapsible(props.collapsible))
    });
    registerPanel(_panel);
    vue.onBeforeUnmount(() => unregisterPanel(_panel));
    __expose({
      /** @description splitter-panel html element */
      splitterPanelRef: panelEl
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        [
          vue.createElementVNode(
            "div",
            vue.mergeProps({
              ref_key: "panelEl",
              ref: panelEl,
              class: [vue.unref(ns).b()],
              style: { flexBasis: `${panelSize.value}px` }
            }, _ctx.$attrs),
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            16
            /* FULL_PROPS */
          ),
          isShowBar.value ? (vue.openBlock(), vue.createBlock(splitBar_vue_vue_type_script_setup_true_lang.default, {
            key: 0,
            index: index$1.value,
            layout: vue.unref(layout),
            lazy: vue.unref(lazy),
            resizable: isResizable.value,
            "start-collapsible": startCollapsible.value,
            "end-collapsible": endCollapsible.value,
            onMoveStart: vue.unref(onMoveStart),
            onMoving: vue.unref(onMoving),
            onMoveEnd: vue.unref(onMoveEnd),
            onCollapse: vue.unref(onCollapse)
          }, {
            "start-collapsible": vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "start-collapsible")
            ]),
            "end-collapsible": vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "end-collapsible")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["index", "layout", "lazy", "resizable", "start-collapsible", "end-collapsible", "onMoveStart", "onMoving", "onMoveEnd", "onCollapse"])) : vue.createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=split-panel.vue2.js.map
