'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tabPane = require('./tab-pane.js');
var vue = require('vue');
var constants = require('./constants.js');
var error = require('../../../utils/error.js');
var index = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["id", "aria-hidden", "aria-labelledby"];
const COMPONENT_NAME = "ElTabPane";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "tab-pane",
  props: tabPane.tabPaneProps,
  setup(__props) {
    const props = __props;
    const instance = vue.getCurrentInstance();
    const slots = vue.useSlots();
    const tabsRoot = vue.inject(constants.tabsRootContextKey);
    if (!tabsRoot)
      error.throwError(COMPONENT_NAME, "usage: <el-tabs><el-tab-pane /></el-tabs/>");
    const ns = index.useNamespace("tab-pane");
    const paneRef = vue.ref();
    const index$1 = vue.ref();
    const isClosable = vue.computed(() => {
      var _a;
      return (_a = props.closable) != null ? _a : tabsRoot.props.closable;
    });
    const active = vue.computed(
      () => {
        var _a;
        return tabsRoot.currentName.value === ((_a = props.name) != null ? _a : index$1.value);
      }
    );
    const loaded = vue.ref(active.value);
    const paneName = vue.computed(() => {
      var _a;
      return (_a = props.name) != null ? _a : index$1.value;
    });
    const shouldBeRender = vue.computed(
      () => !props.lazy || loaded.value || active.value
    );
    const isFocusInsidePane = () => {
      var _a;
      return (_a = paneRef.value) == null ? void 0 : _a.contains(document.activeElement);
    };
    vue.watch(active, (val) => {
      if (val) loaded.value = true;
    });
    const pane = vue.reactive({
      uid: instance.uid,
      getVnode: () => instance.vnode,
      slots,
      props,
      paneName,
      active,
      index: index$1,
      isClosable,
      isFocusInsidePane
    });
    tabsRoot.registerPane(pane);
    vue.onBeforeUnmount(() => {
      tabsRoot.unregisterPane(pane);
    });
    vue.onBeforeUpdate(() => {
      var _a;
      if (slots.label) (_a = tabsRoot.nav$.value) == null ? void 0 : _a.scheduleRender();
    });
    return (_ctx, _cache) => {
      return shouldBeRender.value ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        id: `pane-${paneName.value}`,
        ref_key: "paneRef",
        ref: paneRef,
        class: vue.normalizeClass(vue.unref(ns).b()),
        role: "tabpanel",
        "aria-hidden": !active.value,
        "aria-labelledby": `tab-${paneName.value}`
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1)), [
        [vue.vShow, active.value]
      ]) : vue.createCommentVNode("v-if", true);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=tab-pane.vue2.js.map
