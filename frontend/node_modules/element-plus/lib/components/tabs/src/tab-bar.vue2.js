'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tabBar = require('./tab-bar.js');
var vue = require('vue');
var core = require('@vueuse/core');
var constants = require('./constants.js');
var strings = require('../../../utils/strings.js');
var error = require('../../../utils/error.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');

const COMPONENT_NAME = "ElTabBar";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "tab-bar",
  props: tabBar.tabBarProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const rootTabs = vue.inject(constants.tabsRootContextKey);
    if (!rootTabs) error.throwError(COMPONENT_NAME, "<el-tabs><el-tab-bar /></el-tabs>");
    const ns = index.useNamespace("tabs");
    const barRef = vue.ref();
    const barStyle = vue.ref();
    const renderActiveBar = vue.computed(
      () => {
        var _a;
        return types.isUndefined(rootTabs.props.defaultValue) || Boolean((_a = barStyle.value) == null ? void 0 : _a.transform);
      }
    );
    const getBarStyle = () => {
      let offset = 0;
      let tabSize = 0;
      const sizeName = ["top", "bottom"].includes(rootTabs.props.tabPosition) ? "width" : "height";
      const sizeDir = sizeName === "width" ? "x" : "y";
      const position = sizeDir === "x" ? "left" : "top";
      props.tabs.every((tab) => {
        if (types.isUndefined(tab.paneName)) return false;
        const $el = props.tabRefs[tab.paneName];
        if (!$el) return false;
        if (!tab.active) {
          return true;
        }
        offset = $el[`offset${strings.capitalize(position)}`];
        tabSize = $el[`client${strings.capitalize(sizeName)}`];
        const tabStyles = window.getComputedStyle($el);
        if (sizeName === "width") {
          tabSize -= Number.parseFloat(tabStyles.paddingLeft) + Number.parseFloat(tabStyles.paddingRight);
          offset += Number.parseFloat(tabStyles.paddingLeft);
        }
        return false;
      });
      return {
        [sizeName]: `${tabSize}px`,
        transform: `translate${strings.capitalize(sizeDir)}(${offset}px)`
      };
    };
    const update = () => barStyle.value = getBarStyle();
    const tabObservers = [];
    const observerTabs = () => {
      tabObservers.forEach((observer) => observer.stop());
      tabObservers.length = 0;
      Object.values(props.tabRefs).forEach((tab) => {
        tabObservers.push(core.useResizeObserver(tab, update));
      });
    };
    vue.watch(
      () => props.tabs,
      async () => {
        await vue.nextTick();
        update();
        observerTabs();
      },
      { immediate: true }
    );
    const barObserver = core.useResizeObserver(barRef, () => update());
    vue.onBeforeUnmount(() => {
      tabObservers.forEach((observer) => observer.stop());
      tabObservers.length = 0;
      barObserver.stop();
    });
    __expose({
      /** @description tab root html element */
      ref: barRef,
      /** @description method to manually update tab bar style */
      update
    });
    return (_ctx, _cache) => {
      return renderActiveBar.value ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          ref_key: "barRef",
          ref: barRef,
          class: vue.normalizeClass([vue.unref(ns).e("active-bar"), vue.unref(ns).is(vue.unref(rootTabs).props.tabPosition)]),
          style: vue.normalizeStyle(barStyle.value)
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=tab-bar.vue2.js.map
