import { defineComponent, computed, getCurrentInstance, ref, watch, nextTick, provide, createVNode, renderSlot } from 'vue';
import { omit } from 'lodash-unified';
import { ElIcon } from '../../icon/index.mjs';
import { Plus } from '@element-plus/icons-vue';
import { tabsRootContextKey } from './constants.mjs';
import TabNav from './tab-nav.mjs';
import { isString } from '@vue/shared';
import { isNumber, isUndefined } from '../../../utils/types.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useOrderedChildren } from '../../../hooks/use-ordered-children/index.mjs';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';
import { getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

const tabsProps = buildProps({
  /**
   * @description type of Tab
   */
  type: {
    type: String,
    values: ["card", "border-card", ""],
    default: ""
  },
  /**
   * @description whether Tab is closable
   */
  closable: Boolean,
  /**
   * @description whether Tab is addable
   */
  addable: Boolean,
  /**
   * @description binding value, name of the selected tab
   */
  modelValue: {
    type: [String, Number]
  },
  /**
   * @description initial value when `model-value` is not set
   */
  defaultValue: {
    type: [String, Number]
  },
  /**
   * @description whether Tab is addable and closable
   */
  editable: Boolean,
  /**
   * @description position of tabs
   */
  tabPosition: {
    type: String,
    values: ["top", "right", "bottom", "left"],
    default: "top"
  },
  /**
   * @description hook function before switching tab. If `false` is returned or a `Promise` is returned and then is rejected, switching will be prevented
   */
  beforeLeave: {
    type: definePropType(Function),
    default: () => true
  },
  /**
   * @description whether width of tab automatically fits its container
   */
  stretch: Boolean,
  /**
   * @description tabs tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0
  }
});
const isPaneName = (value) => isString(value) || isNumber(value);
const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (name) => isPaneName(name),
  tabClick: (pane, ev) => ev instanceof Event,
  tabChange: (name) => isPaneName(name),
  edit: (paneName, action) => ["remove", "add"].includes(action),
  tabRemove: (name) => isPaneName(name),
  tabAdd: () => true
};
const Tabs = /* @__PURE__ */ defineComponent({
  name: "ElTabs",
  props: tabsProps,
  emits: tabsEmits,
  setup(props, {
    emit,
    slots,
    expose
  }) {
    var _a;
    const ns = useNamespace("tabs");
    const isVertical = computed(() => ["left", "right"].includes(props.tabPosition));
    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane,
      ChildrenSorter: PanesSorter
    } = useOrderedChildren(getCurrentInstance(), "ElTabPane");
    const nav$ = ref();
    const currentName = ref((_a = isUndefined(props.modelValue) ? props.defaultValue : props.modelValue) != null ? _a : "0");
    const setCurrentName = async (value, trigger = false) => {
      var _a2, _b, _c, _d;
      if (currentName.value === value || isUndefined(value)) return;
      try {
        let canLeave;
        if (props.beforeLeave) {
          const result = props.beforeLeave(value, currentName.value);
          canLeave = result instanceof Promise ? await result : result;
        } else {
          canLeave = true;
        }
        if (canLeave !== false) {
          const isFocusInsidePane = (_a2 = panes.value.find((item) => item.paneName === currentName.value)) == null ? void 0 : _a2.isFocusInsidePane();
          currentName.value = value;
          if (trigger) {
            emit(UPDATE_MODEL_EVENT, value);
            emit("tabChange", value);
          }
          (_c = (_b = nav$.value) == null ? void 0 : _b.removeFocus) == null ? void 0 : _c.call(_b);
          if (isFocusInsidePane) {
            (_d = nav$.value) == null ? void 0 : _d.focusActiveTab();
          }
        }
      } catch (e) {
      }
    };
    const handleTabClick = (tab, tabName, event) => {
      if (tab.props.disabled) return;
      emit("tabClick", tab, event);
      setCurrentName(tabName, true);
    };
    const handleTabRemove = (pane, ev) => {
      if (pane.props.disabled || isUndefined(pane.props.name)) return;
      ev.stopPropagation();
      emit("edit", pane.props.name, "remove");
      emit("tabRemove", pane.props.name);
    };
    const handleTabAdd = () => {
      emit("edit", void 0, "add");
      emit("tabAdd");
    };
    const handleKeydown = (event) => {
      const code = getEventCode(event);
      if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter].includes(code)) handleTabAdd();
    };
    const swapChildren = (vnode) => {
      const actualFirstChild = vnode.el.firstChild;
      const firstChild = ["bottom", "right"].includes(props.tabPosition) ? vnode.children[0].el : vnode.children[1].el;
      if (actualFirstChild !== firstChild) {
        actualFirstChild.before(firstChild);
      }
    };
    watch(() => props.modelValue, (modelValue) => setCurrentName(modelValue));
    watch(currentName, async () => {
      var _a2;
      await nextTick();
      (_a2 = nav$.value) == null ? void 0 : _a2.scrollToActiveTab();
    });
    provide(tabsRootContextKey, {
      props,
      currentName,
      registerPane,
      unregisterPane,
      nav$
    });
    expose({
      currentName,
      get tabNavRef() {
        return omit(nav$.value, ["scheduleRender"]);
      }
    });
    return () => {
      const addSlot = slots["add-icon"];
      const newButton = props.editable || props.addable ? createVNode("div", {
        "class": [ns.e("new-tab"), isVertical.value && ns.e("new-tab-vertical")],
        "tabindex": props.tabindex,
        "onClick": handleTabAdd,
        "onKeydown": handleKeydown
      }, [addSlot ? renderSlot(slots, "add-icon") : createVNode(ElIcon, {
        "class": ns.is("icon-plus")
      }, {
        default: () => [createVNode(Plus, null, null)]
      })]) : null;
      const tabNav = () => createVNode(TabNav, {
        "ref": nav$,
        "currentName": currentName.value,
        "editable": props.editable,
        "type": props.type,
        "panes": panes.value,
        "stretch": props.stretch,
        "onTabClick": handleTabClick,
        "onTabRemove": handleTabRemove
      }, null);
      const header = createVNode("div", {
        "class": [ns.e("header"), isVertical.value && ns.e("header-vertical"), ns.is(props.tabPosition)]
      }, [createVNode(PanesSorter, null, {
        default: tabNav,
        $stable: true
      }), newButton]);
      const panels = createVNode("div", {
        "class": ns.e("content")
      }, [renderSlot(slots, "default")]);
      return createVNode("div", {
        "class": [ns.b(), ns.m(props.tabPosition), {
          [ns.m("card")]: props.type === "card",
          [ns.m("border-card")]: props.type === "border-card"
        }],
        "onVnodeMounted": swapChildren,
        "onVnodeUpdated": swapChildren
      }, [panels, header]);
    };
  }
});

export { Tabs as default, tabsEmits, tabsProps };
//# sourceMappingURL=tabs.mjs.map
