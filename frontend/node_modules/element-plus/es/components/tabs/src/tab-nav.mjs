import { defineComponent, inject, ref, shallowRef, computed, watch, onMounted, onUpdated, triggerRef, createVNode, nextTick } from 'vue';
import { useDocumentVisibility, useWindowFocus, useElementSize, useResizeObserver } from '@vueuse/core';
import { ElIcon } from '../../icon/index.mjs';
import { ArrowLeft, ArrowRight, Close } from '@element-plus/icons-vue';
import useWheel from '../../virtual-list/src/hooks/use-wheel.mjs';
import { clamp } from 'lodash-unified';
import _sfc_main from './tab-bar.vue2.mjs';
import { tabsRootContextKey } from './constants.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { throwError } from '../../../utils/error.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { rAF } from '../../../utils/raf.mjs';
import { getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';
import { mutable } from '../../../utils/typescript.mjs';
import { capitalize } from '../../../utils/strings.mjs';

const tabNavProps = buildProps({
  panes: {
    type: definePropType(Array),
    default: () => mutable([])
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
const TabNav = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME,
  props: tabNavProps,
  emits: tabNavEmits,
  setup(props, {
    expose,
    emit
  }) {
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs) throwError(COMPONENT_NAME, `<el-tabs><tab-nav /></el-tabs>`);
    const ns = useNamespace("tabs");
    const visibility = useDocumentVisibility();
    const focused = useWindowFocus();
    const navScroll$ = ref();
    const nav$ = ref();
    const el$ = ref();
    const tabRefsMap = ref({});
    const tabBarRef = ref();
    const scrollable = ref(false);
    const navOffset = ref(0);
    const isFocus = ref(false);
    const focusable = ref(true);
    const tracker = shallowRef();
    const isHorizontal = computed(() => ["top", "bottom"].includes(rootTabs.props.tabPosition));
    const sizeName = computed(() => isHorizontal.value ? "width" : "height");
    const navStyle = computed(() => {
      const dir = sizeName.value === "width" ? "X" : "Y";
      return {
        transform: `translate${dir}(-${navOffset.value}px)`
      };
    });
    const {
      width: navContainerWidth,
      height: navContainerHeight
    } = useElementSize(navScroll$);
    const {
      width: navWidth,
      height: navHeight
    } = useElementSize(nav$, {
      width: 0,
      height: 0
    }, {
      box: "border-box"
    });
    const navContainerSize = computed(() => isHorizontal.value ? navContainerWidth.value : navContainerHeight.value);
    const navSize = computed(() => isHorizontal.value ? navWidth.value : navHeight.value);
    const {
      onWheel
    } = useWheel({
      atStartEdge: computed(() => navOffset.value <= 0),
      atEndEdge: computed(() => navSize.value - navOffset.value <= navContainerSize.value),
      layout: computed(() => isHorizontal.value ? "horizontal" : "vertical")
    }, (offset) => {
      navOffset.value = clamp(navOffset.value + offset, 0, navSize.value - navContainerSize.value);
    });
    const scrollPrev = () => {
      if (!navScroll$.value) return;
      const containerSize = navScroll$.value[`offset${capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (!currentOffset) return;
      const newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;
      navOffset.value = newOffset;
    };
    const scrollNext = () => {
      if (!navScroll$.value || !nav$.value) return;
      const navSize2 = nav$.value[`offset${capitalize(sizeName.value)}`];
      const containerSize = navScroll$.value[`offset${capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (navSize2 - currentOffset <= containerSize) return;
      const newOffset = navSize2 - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize2 - containerSize;
      navOffset.value = newOffset;
    };
    const scrollToActiveTab = async () => {
      const nav = nav$.value;
      if (!scrollable.value || !el$.value || !navScroll$.value || !nav) return;
      await nextTick();
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
      const navSize2 = nav$.value[`offset${capitalize(sizeName.value)}`];
      const containerSize = navScroll$.value[`offset${capitalize(sizeName.value)}`];
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
    const changeTab = (event) => {
      const code = getEventCode(event);
      let step = 0;
      switch (code) {
        case EVENT_CODE.left:
        case EVENT_CODE.up:
          step = -1;
          break;
        case EVENT_CODE.right:
        case EVENT_CODE.down:
          step = 1;
          break;
        default:
          return;
      }
      const tabList = Array.from(event.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)"));
      const currentIndex = tabList.indexOf(event.target);
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
      await nextTick();
      const activeTab = tabRefsMap.value[props.currentName];
      activeTab == null ? void 0 : activeTab.focus({
        preventScroll: true
      });
    };
    watch(visibility, (visibility2) => {
      if (visibility2 === "hidden") {
        focusable.value = false;
      } else if (visibility2 === "visible") {
        setTimeout(() => focusable.value = true, 50);
      }
    });
    watch(focused, (focused2) => {
      if (focused2) {
        setTimeout(() => focusable.value = true, 50);
      } else {
        focusable.value = false;
      }
    });
    useResizeObserver(el$, () => {
      rAF(update);
    });
    onMounted(() => setTimeout(() => scrollToActiveTab(), 0));
    onUpdated(() => update());
    expose({
      scrollToActiveTab,
      removeFocus,
      focusActiveTab,
      tabListRef: nav$,
      tabBarRef,
      scheduleRender: () => triggerRef(tracker)
    });
    return () => {
      const scrollBtn = scrollable.value ? [createVNode("span", {
        "class": [ns.e("nav-prev"), ns.is("disabled", !scrollable.value.prev)],
        "onClick": scrollPrev
      }, [createVNode(ElIcon, null, {
        default: () => [createVNode(ArrowLeft, null, null)]
      })]), createVNode("span", {
        "class": [ns.e("nav-next"), ns.is("disabled", !scrollable.value.next)],
        "onClick": scrollNext
      }, [createVNode(ElIcon, null, {
        default: () => [createVNode(ArrowRight, null, null)]
      })])] : null;
      const tabs = props.panes.map((pane, index) => {
        var _a, _b, _c, _d, _e;
        const uid = pane.uid;
        const disabled = pane.props.disabled;
        const tabName = (_b = (_a = pane.props.name) != null ? _a : pane.index) != null ? _b : `${index}`;
        const closable = !disabled && (pane.isClosable || pane.props.closable !== false && props.editable);
        pane.index = `${index}`;
        const btnClose = closable ? createVNode(ElIcon, {
          "class": "is-icon-close",
          "onClick": (ev) => emit("tabRemove", pane, ev)
        }, {
          default: () => [createVNode(Close, null, null)]
        }) : null;
        const tabLabelContent = ((_d = (_c = pane.slots).label) == null ? void 0 : _d.call(_c)) || pane.props.label;
        const tabindex = !disabled && pane.active ? (_e = props.tabindex) != null ? _e : rootTabs.props.tabindex : -1;
        return createVNode("div", {
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
            const code = getEventCode(ev);
            if (closable && (code === EVENT_CODE.delete || code === EVENT_CODE.backspace)) {
              emit("tabRemove", pane, ev);
            }
          }
        }, [...[tabLabelContent, btnClose]]);
      });
      tracker.value;
      return createVNode("div", {
        "ref": el$,
        "class": [ns.e("nav-wrap"), ns.is("scrollable", !!scrollable.value), ns.is(rootTabs.props.tabPosition)]
      }, [scrollBtn, createVNode("div", {
        "class": ns.e("nav-scroll"),
        "ref": navScroll$
      }, [props.panes.length > 0 ? createVNode("div", {
        "class": [ns.e("nav"), ns.is(rootTabs.props.tabPosition), ns.is("stretch", props.stretch && ["top", "bottom"].includes(rootTabs.props.tabPosition))],
        "ref": nav$,
        "style": navStyle.value,
        "role": "tablist",
        "onKeydown": changeTab,
        "onWheel": onWheel
      }, [...[!props.type ? createVNode(_sfc_main, {
        "ref": tabBarRef,
        "tabs": [...props.panes],
        "tabRefs": tabRefsMap.value
      }, null) : null, tabs]]) : null])]);
    };
  }
});

export { TabNav as default, tabNavEmits, tabNavProps };
//# sourceMappingURL=tab-nav.mjs.map
