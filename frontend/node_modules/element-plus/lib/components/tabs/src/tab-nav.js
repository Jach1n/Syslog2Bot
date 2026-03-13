'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var index$1 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var useWheel = require('../../virtual-list/src/hooks/use-wheel.js');
var lodashUnified = require('lodash-unified');
var tabBar_vue_vue_type_script_setup_true_lang = require('./tab-bar.vue2.js');
var constants = require('./constants.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var error = require('../../../utils/error.js');
var index = require('../../../hooks/use-namespace/index.js');
var raf = require('../../../utils/raf.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');
var typescript = require('../../../utils/typescript.js');
var strings = require('../../../utils/strings.js');

const tabNavProps = runtime.buildProps({
  panes: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  currentName: {
    type: [String, Number],
    default: ""
  },
  editable: Boolean,
  type: {
    type: String,
    values: ["card", "border-card", ""],
    default: ""
  },
  stretch: Boolean,
  /**
   * @description tab-nav tabindex
   */
  tabindex: {
    type: [String, Number],
    default: void 0
  }
});
const tabNavEmits = {
  tabClick: (tab, tabName, ev) => ev instanceof Event,
  tabRemove: (tab, ev) => ev instanceof Event
};
const COMPONENT_NAME = "ElTabNav";
const TabNav = /* @__PURE__ */ vue.defineComponent({
  name: COMPONENT_NAME,
  props: tabNavProps,
  emits: tabNavEmits,
  setup(props, {
    expose,
    emit
  }) {
    const rootTabs = vue.inject(constants.tabsRootContextKey);
    if (!rootTabs) error.throwError(COMPONENT_NAME, `<el-tabs><tab-nav /></el-tabs>`);
    const ns = index.useNamespace("tabs");
    const visibility = core.useDocumentVisibility();
    const focused = core.useWindowFocus();
    const navScroll$ = vue.ref();
    const nav$ = vue.ref();
    const el$ = vue.ref();
    const tabRefsMap = vue.ref({});
    const tabBarRef = vue.ref();
    const scrollable = vue.ref(false);
    const navOffset = vue.ref(0);
    const isFocus = vue.ref(false);
    const focusable = vue.ref(true);
    const tracker = vue.shallowRef();
    const isHorizontal = vue.computed(() => ["top", "bottom"].includes(rootTabs.props.tabPosition));
    const sizeName = vue.computed(() => isHorizontal.value ? "width" : "height");
    const navStyle = vue.computed(() => {
      const dir = sizeName.value === "width" ? "X" : "Y";
      return {
        transform: `translate${dir}(-${navOffset.value}px)`
      };
    });
    const {
      width: navContainerWidth,
      height: navContainerHeight
    } = core.useElementSize(navScroll$);
    const {
      width: navWidth,
      height: navHeight
    } = core.useElementSize(nav$, {
      width: 0,
      height: 0
    }, {
      box: "border-box"
    });
    const navContainerSize = vue.computed(() => isHorizontal.value ? navContainerWidth.value : navContainerHeight.value);
    const navSize = vue.computed(() => isHorizontal.value ? navWidth.value : navHeight.value);
    const {
      onWheel
    } = useWheel.default({
      atStartEdge: vue.computed(() => navOffset.value <= 0),
      atEndEdge: vue.computed(() => navSize.value - navOffset.value <= navContainerSize.value),
      layout: vue.computed(() => isHorizontal.value ? "horizontal" : "vertical")
    }, (offset) => {
      navOffset.value = lodashUnified.clamp(navOffset.value + offset, 0, navSize.value - navContainerSize.value);
    });
    const scrollPrev = () => {
      if (!navScroll$.value) return;
      const containerSize = navScroll$.value[`offset${strings.capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (!currentOffset) return;
      const newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;
      navOffset.value = newOffset;
    };
    const scrollNext = () => {
      if (!navScroll$.value || !nav$.value) return;
      const navSize2 = nav$.value[`offset${strings.capitalize(sizeName.value)}`];
      const containerSize = navScroll$.value[`offset${strings.capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (navSize2 - currentOffset <= containerSize) return;
      const newOffset = navSize2 - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize2 - containerSize;
      navOffset.value = newOffset;
    };
    const scrollToActiveTab = async () => {
      const nav = nav$.value;
      if (!scrollable.value || !el$.value || !navScroll$.value || !nav) return;
      await vue.nextTick();
      const activeTab = tabRefsMap.value[props.currentName];
      if (!activeTab) return;
      const navScroll = navScroll$.value;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll.getBoundingClientRect();
      const maxOffset = isHorizontal.value ? nav.offsetWidth - navScrollBounding.width : nav.offsetHeight - navScrollBounding.height;
      const currentOffset = navOffset.value;
      let newOffset = currentOffset;
      if (isHorizontal.value) {
        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
        }
      }
      newOffset = Math.max(newOffset, 0);
      navOffset.value = Math.min(newOffset, maxOffset);
    };
    const update = () => {
      var _a;
      if (!nav$.value || !navScroll$.value) return;
      props.stretch && ((_a = tabBarRef.value) == null ? void 0 : _a.update());
      const navSize2 = nav$.value[`offset${strings.capitalize(sizeName.value)}`];
      const containerSize = navScroll$.value[`offset${strings.capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (containerSize < navSize2) {
        scrollable.value = scrollable.value || {};
        scrollable.value.prev = currentOffset;
        scrollable.value.next = currentOffset + containerSize < navSize2;
        if (navSize2 - currentOffset < containerSize) {
          navOffset.value = navSize2 - containerSize;
        }
      } else {
        scrollable.value = false;
        if (currentOffset > 0) {
          navOffset.value = 0;
        }
      }
    };
    const changeTab = (event$1) => {
      const code = event.getEventCode(event$1);
      let step = 0;
      switch (code) {
        case aria.EVENT_CODE.left:
        case aria.EVENT_CODE.up:
          step = -1;
          break;
        case aria.EVENT_CODE.right:
        case aria.EVENT_CODE.down:
          step = 1;
          break;
        default:
          return;
      }
      const tabList = Array.from(event$1.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)"));
      const currentIndex = tabList.indexOf(event$1.target);
      let nextIndex = currentIndex + step;
      if (nextIndex < 0) {
        nextIndex = tabList.length - 1;
      } else if (nextIndex >= tabList.length) {
        nextIndex = 0;
      }
      tabList[nextIndex].focus({
        preventScroll: true
      });
      tabList[nextIndex].click();
      setFocus();
    };
    const setFocus = () => {
      if (focusable.value) isFocus.value = true;
    };
    const removeFocus = () => isFocus.value = false;
    const setRefs = (el, key) => {
      tabRefsMap.value[key] = el;
    };
    const focusActiveTab = async () => {
      await vue.nextTick();
      const activeTab = tabRefsMap.value[props.currentName];
      activeTab == null ? void 0 : activeTab.focus({
        preventScroll: true
      });
    };
    vue.watch(visibility, (visibility2) => {
      if (visibility2 === "hidden") {
        focusable.value = false;
      } else if (visibility2 === "visible") {
        setTimeout(() => focusable.value = true, 50);
      }
    });
    vue.watch(focused, (focused2) => {
      if (focused2) {
        setTimeout(() => focusable.value = true, 50);
      } else {
        focusable.value = false;
      }
    });
    core.useResizeObserver(el$, () => {
      raf.rAF(update);
    });
    vue.onMounted(() => setTimeout(() => scrollToActiveTab(), 0));
    vue.onUpdated(() => update());
    expose({
      scrollToActiveTab,
      removeFocus,
      focusActiveTab,
      tabListRef: nav$,
      tabBarRef,
      scheduleRender: () => vue.triggerRef(tracker)
    });
    return () => {
      const scrollBtn = scrollable.value ? [vue.createVNode("span", {
        "class": [ns.e("nav-prev"), ns.is("disabled", !scrollable.value.prev)],
        "onClick": scrollPrev
      }, [vue.createVNode(index$1.ElIcon, null, {
        default: () => [vue.createVNode(iconsVue.ArrowLeft, null, null)]
      })]), vue.createVNode("span", {
        "class": [ns.e("nav-next"), ns.is("disabled", !scrollable.value.next)],
        "onClick": scrollNext
      }, [vue.createVNode(index$1.ElIcon, null, {
        default: () => [vue.createVNode(iconsVue.ArrowRight, null, null)]
      })])] : null;
      const tabs = props.panes.map((pane, index) => {
        var _a, _b, _c, _d, _e;
        const uid = pane.uid;
        const disabled = pane.props.disabled;
        const tabName = (_b = (_a = pane.props.name) != null ? _a : pane.index) != null ? _b : `${index}`;
        const closable = !disabled && (pane.isClosable || pane.props.closable !== false && props.editable);
        pane.index = `${index}`;
        const btnClose = closable ? vue.createVNode(index$1.ElIcon, {
          "class": "is-icon-close",
          "onClick": (ev) => emit("tabRemove", pane, ev)
        }, {
          default: () => [vue.createVNode(iconsVue.Close, null, null)]
        }) : null;
        const tabLabelContent = ((_d = (_c = pane.slots).label) == null ? void 0 : _d.call(_c)) || pane.props.label;
        const tabindex = !disabled && pane.active ? (_e = props.tabindex) != null ? _e : rootTabs.props.tabindex : -1;
        return vue.createVNode("div", {
          "ref": (el) => setRefs(el, tabName),
          "class": [ns.e("item"), ns.is(rootTabs.props.tabPosition), ns.is("active", pane.active), ns.is("disabled", disabled), ns.is("closable", closable), ns.is("focus", isFocus.value)],
          "id": `tab-${tabName}`,
          "key": `tab-${uid}`,
          "aria-controls": `pane-${tabName}`,
          "role": "tab",
          "aria-selected": pane.active,
          "tabindex": tabindex,
          "onFocus": () => setFocus(),
          "onBlur": () => removeFocus(),
          "onClick": (ev) => {
            removeFocus();
            emit("tabClick", pane, tabName, ev);
          },
          "onKeydown": (ev) => {
            const code = event.getEventCode(ev);
            if (closable && (code === aria.EVENT_CODE.delete || code === aria.EVENT_CODE.backspace)) {
              emit("tabRemove", pane, ev);
            }
          }
        }, [...[tabLabelContent, btnClose]]);
      });
      tracker.value;
      return vue.createVNode("div", {
        "ref": el$,
        "class": [ns.e("nav-wrap"), ns.is("scrollable", !!scrollable.value), ns.is(rootTabs.props.tabPosition)]
      }, [scrollBtn, vue.createVNode("div", {
        "class": ns.e("nav-scroll"),
        "ref": navScroll$
      }, [props.panes.length > 0 ? vue.createVNode("div", {
        "class": [ns.e("nav"), ns.is(rootTabs.props.tabPosition), ns.is("stretch", props.stretch && ["top", "bottom"].includes(rootTabs.props.tabPosition))],
        "ref": nav$,
        "style": navStyle.value,
        "role": "tablist",
        "onKeydown": changeTab,
        "onWheel": onWheel
      }, [...[!props.type ? vue.createVNode(tabBar_vue_vue_type_script_setup_true_lang.default, {
        "ref": tabBarRef,
        "tabs": [...props.panes],
        "tabRefs": tabRefsMap.value
      }, null) : null, tabs]]) : null])]);
    };
  }
});

exports.default = TabNav;
exports.tabNavEmits = tabNavEmits;
exports.tabNavProps = tabNavProps;
//# sourceMappingURL=tab-nav.js.map
