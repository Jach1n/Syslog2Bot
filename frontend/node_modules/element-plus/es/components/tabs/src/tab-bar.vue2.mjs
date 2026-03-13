import { tabBarProps } from './tab-bar.mjs';
import { defineComponent, inject, ref, computed, watch, nextTick, onBeforeUnmount, createElementBlock, createCommentVNode, openBlock, normalizeStyle, normalizeClass, unref } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { tabsRootContextKey } from './constants.mjs';
import { capitalize } from '../../../utils/strings.mjs';
import { throwError } from '../../../utils/error.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../utils/types.mjs';

const COMPONENT_NAME = "ElTabBar";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "tab-bar",
  props: tabBarProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs) throwError(COMPONENT_NAME, "<el-tabs><el-tab-bar /></el-tabs>");
    const ns = useNamespace("tabs");
    const barRef = ref();
    const barStyle = ref();
    const renderActiveBar = computed(
      () => {
        var _a;
        return isUndefined(rootTabs.props.defaultValue) || Boolean((_a = barStyle.value) == null ? void 0 : _a.transform);
      }
    );
    const getBarStyle = () => {
      let offset = 0;
      let tabSize = 0;
      const sizeName = ["top", "bottom"].includes(rootTabs.props.tabPosition) ? "width" : "height";
      const sizeDir = sizeName === "width" ? "x" : "y";
      const position = sizeDir === "x" ? "left" : "top";
      props.tabs.every((tab) => {
        if (isUndefined(tab.paneName)) return false;
        const $el = props.tabRefs[tab.paneName];
        if (!$el) return false;
        if (!tab.active) {
          return true;
        }
        offset = $el[`offset${capitalize(position)}`];
        tabSize = $el[`client${capitalize(sizeName)}`];
        const tabStyles = window.getComputedStyle($el);
        if (sizeName === "width") {
          tabSize -= Number.parseFloat(tabStyles.paddingLeft) + Number.parseFloat(tabStyles.paddingRight);
          offset += Number.parseFloat(tabStyles.paddingLeft);
        }
        return false;
      });
      return {
        [sizeName]: `${tabSize}px`,
        transform: `translate${capitalize(sizeDir)}(${offset}px)`
      };
    };
    const update = () => barStyle.value = getBarStyle();
    const tabObservers = [];
    const observerTabs = () => {
      tabObservers.forEach((observer) => observer.stop());
      tabObservers.length = 0;
      Object.values(props.tabRefs).forEach((tab) => {
        tabObservers.push(useResizeObserver(tab, update));
      });
    };
    watch(
      () => props.tabs,
      async () => {
        await nextTick();
        update();
        observerTabs();
      },
      { immediate: true }
    );
    const barObserver = useResizeObserver(barRef, () => update());
    onBeforeUnmount(() => {
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
      return renderActiveBar.value ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          ref_key: "barRef",
          ref: barRef,
          class: normalizeClass([unref(ns).e("active-bar"), unref(ns).is(unref(rootTabs).props.tabPosition)]),
          style: normalizeStyle(barStyle.value)
        },
        null,
        6
        /* CLASS, STYLE */
      )) : createCommentVNode("v-if", true);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=tab-bar.vue2.mjs.map
