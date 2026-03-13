'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var index$2 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var constants = require('./constants.js');
var tabNav = require('./tab-nav.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-ordered-children/index.js');
var event = require('../../../constants/event.js');
var event$1 = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

const tabsProps = runtime.buildProps({
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
    type: runtime.definePropType(Function),
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
const isPaneName = (value) => shared.isString(value) || types.isNumber(value);
const tabsEmits = {
  [event.UPDATE_MODEL_EVENT]: (name) => isPaneName(name),
  tabClick: (pane, ev) => ev instanceof Event,
  tabChange: (name) => isPaneName(name),
  edit: (paneName, action) => ["remove", "add"].includes(action),
  tabRemove: (name) => isPaneName(name),
  tabAdd: () => true
};
const Tabs = /* @__PURE__ */ vue.defineComponent({
  name: "ElTabs",
  props: tabsProps,
  emits: tabsEmits,
  setup(props, {
    emit,
    slots,
    expose
  }) {
    var _a;
    const ns = index.useNamespace("tabs");
    const isVertical = vue.computed(() => ["left", "right"].includes(props.tabPosition));
    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane,
      ChildrenSorter: PanesSorter
    } = index$1.useOrderedChildren(vue.getCurrentInstance(), "ElTabPane");
    const nav$ = vue.ref();
    const currentName = vue.ref((_a = types.isUndefined(props.modelValue) ? props.defaultValue : props.modelValue) != null ? _a : "0");
    const setCurrentName = async (value, trigger = false) => {
      var _a2, _b, _c, _d;
      if (currentName.value === value || types.isUndefined(value)) return;
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
            emit(event.UPDATE_MODEL_EVENT, value);
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
      if (pane.props.disabled || types.isUndefined(pane.props.name)) return;
      ev.stopPropagation();
      emit("edit", pane.props.name, "remove");
      emit("tabRemove", pane.props.name);
    };
    const handleTabAdd = () => {
      emit("edit", void 0, "add");
      emit("tabAdd");
    };
    const handleKeydown = (event) => {
      const code = event$1.getEventCode(event);
      if ([aria.EVENT_CODE.enter, aria.EVENT_CODE.numpadEnter].includes(code)) handleTabAdd();
    };
    const swapChildren = (vnode) => {
      const actualFirstChild = vnode.el.firstChild;
      const firstChild = ["bottom", "right"].includes(props.tabPosition) ? vnode.children[0].el : vnode.children[1].el;
      if (actualFirstChild !== firstChild) {
        actualFirstChild.before(firstChild);
      }
    };
    vue.watch(() => props.modelValue, (modelValue) => setCurrentName(modelValue));
    vue.watch(currentName, async () => {
      var _a2;
      await vue.nextTick();
      (_a2 = nav$.value) == null ? void 0 : _a2.scrollToActiveTab();
    });
    vue.provide(constants.tabsRootContextKey, {
      props,
      currentName,
      registerPane,
      unregisterPane,
      nav$
    });
    expose({
      currentName,
      get tabNavRef() {
        return lodashUnified.omit(nav$.value, ["scheduleRender"]);
      }
    });
    return () => {
      const addSlot = slots["add-icon"];
      const newButton = props.editable || props.addable ? vue.createVNode("div", {
        "class": [ns.e("new-tab"), isVertical.value && ns.e("new-tab-vertical")],
        "tabindex": props.tabindex,
        "onClick": handleTabAdd,
        "onKeydown": handleKeydown
      }, [addSlot ? vue.renderSlot(slots, "add-icon") : vue.createVNode(index$2.ElIcon, {
        "class": ns.is("icon-plus")
      }, {
        default: () => [vue.createVNode(iconsVue.Plus, null, null)]
      })]) : null;
      const tabNav$1 = () => vue.createVNode(tabNav.default, {
        "ref": nav$,
        "currentName": currentName.value,
        "editable": props.editable,
        "type": props.type,
        "panes": panes.value,
        "stretch": props.stretch,
        "onTabClick": handleTabClick,
        "onTabRemove": handleTabRemove
      }, null);
      const header = vue.createVNode("div", {
        "class": [ns.e("header"), isVertical.value && ns.e("header-vertical"), ns.is(props.tabPosition)]
      }, [vue.createVNode(PanesSorter, null, {
        default: tabNav$1,
        $stable: true
      }), newButton]);
      const panels = vue.createVNode("div", {
        "class": ns.e("content")
      }, [vue.renderSlot(slots, "default")]);
      return vue.createVNode("div", {
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

exports.default = Tabs;
exports.tabsEmits = tabsEmits;
exports.tabsProps = tabsProps;
//# sourceMappingURL=tabs.js.map
