'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var menu_vue_vue_type_script_setup_true_lang = require('./menu.vue2.js');
var store = require('./store.js');
var node = require('./node.js');
var utils = require('./utils.js');
var types = require('./types.js');
var arrays = require('../../../utils/arrays.js');
var aria$1 = require('../../../utils/dom/aria.js');
var index = require('../../../hooks/use-namespace/index.js');
var event = require('../../../constants/event.js');
var types$1 = require('../../../utils/types.js');
var core = require('@vueuse/core');
var scroll = require('../../../utils/dom/scroll.js');
var event$1 = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCascaderPanel"
  },
  __name: "index",
  props: config.cascaderPanelProps,
  emits: config.cascaderPanelEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let manualChecked = false;
    const ns = index.useNamespace("cascader");
    const config$1 = config.useCascaderConfig(props);
    const slots = vue.useSlots();
    let store$1;
    const initialLoaded = vue.ref(true);
    const initialLoadedOnce = vue.ref(false);
    const menuList = vue.ref([]);
    const checkedValue = vue.ref();
    const menus = vue.ref([]);
    const expandingNode = vue.ref();
    const checkedNodes = vue.ref([]);
    const isHoverMenu = vue.computed(() => config$1.value.expandTrigger === "hover");
    const renderLabelFn = vue.computed(() => props.renderLabel || slots.default);
    const initStore = () => {
      const { options } = props;
      const cfg = config$1.value;
      manualChecked = false;
      store$1 = new store.default(options, cfg);
      menus.value = [store$1.getNodes()];
      if (cfg.lazy && types$1.isEmpty(props.options)) {
        initialLoaded.value = false;
        lazyLoad(void 0, (list) => {
          if (list) {
            store$1 = new store.default(list, cfg);
            menus.value = [store$1.getNodes()];
          }
          initialLoaded.value = true;
          syncCheckedValue(false, true);
        });
      } else {
        syncCheckedValue(false, true);
      }
    };
    const lazyLoad = (node$1, cb) => {
      const cfg = config$1.value;
      node$1 = node$1 || new node.default({}, cfg, void 0, true);
      node$1.loading = true;
      const resolve = (dataList) => {
        const _node = node$1;
        const parent = _node.root ? null : _node;
        _node.loading = false;
        _node.loaded = true;
        _node.childrenData = _node.childrenData || [];
        dataList && (store$1 == null ? void 0 : store$1.appendNodes(dataList, parent));
        dataList && (cb == null ? void 0 : cb(dataList));
        if (node$1.level === 0) {
          initialLoadedOnce.value = true;
        }
      };
      const reject = () => {
        node$1.loading = false;
        node$1.loaded = false;
        if (node$1.level === 0) {
          initialLoaded.value = true;
        }
      };
      cfg.lazyLoad(node$1, resolve, reject);
    };
    const expandNode = (node, silent) => {
      var _a;
      const { level } = node;
      const newMenus = menus.value.slice(0, level);
      let newExpandingNode;
      if (node.isLeaf) {
        newExpandingNode = node.pathNodes[level - 2];
      } else {
        newExpandingNode = node;
        newMenus.push(node.children);
      }
      if (((_a = expandingNode.value) == null ? void 0 : _a.uid) !== (newExpandingNode == null ? void 0 : newExpandingNode.uid)) {
        expandingNode.value = node;
        menus.value = newMenus;
        !silent && emit("expand-change", (node == null ? void 0 : node.pathValues) || []);
      }
    };
    const handleCheckChange = (node, checked, emitClose = true) => {
      const { checkStrictly, multiple } = config$1.value;
      const oldNode = checkedNodes.value[0];
      manualChecked = true;
      !multiple && (oldNode == null ? void 0 : oldNode.doCheck(false));
      node.doCheck(checked);
      calculateCheckedValue();
      emitClose && !multiple && !checkStrictly && emit("close");
      !emitClose && !multiple && expandParentNode(node);
    };
    const expandParentNode = (node) => {
      if (!node) return;
      node = node.parent;
      expandParentNode(node);
      node && expandNode(node);
    };
    const getFlattedNodes = (leafOnly) => store$1 == null ? void 0 : store$1.getFlattedNodes(leafOnly);
    const getCheckedNodes = (leafOnly) => {
      var _a;
      return (_a = getFlattedNodes(leafOnly)) == null ? void 0 : _a.filter(({ checked }) => checked !== false);
    };
    const clearCheckedNodes = () => {
      checkedNodes.value.forEach((node) => node.doCheck(false));
      calculateCheckedValue();
      menus.value = menus.value.slice(0, 1);
      expandingNode.value = void 0;
      emit("expand-change", []);
    };
    const calculateCheckedValue = () => {
      var _a;
      const { checkStrictly, multiple } = config$1.value;
      const oldNodes = checkedNodes.value;
      const newNodes = getCheckedNodes(!checkStrictly);
      const nodes = utils.sortByOriginalOrder(oldNodes, newNodes);
      const values = nodes.map((node) => node.valueByOption);
      checkedNodes.value = nodes;
      checkedValue.value = multiple ? values : (_a = values[0]) != null ? _a : null;
    };
    const syncCheckedValue = (loaded = false, forced = false) => {
      const { modelValue } = props;
      const { lazy, multiple, checkStrictly } = config$1.value;
      const leafOnly = !checkStrictly;
      if (!initialLoaded.value || manualChecked || !forced && lodashUnified.isEqual(modelValue, checkedValue.value))
        return;
      if (lazy && !loaded) {
        const values = arrays.unique(
          lodashUnified.flattenDeep(arrays.castArray(modelValue))
        );
        const nodes = values.map((val) => store$1 == null ? void 0 : store$1.getNodeByValue(val)).filter((node) => !!node && !node.loaded && !node.loading);
        if (nodes.length) {
          nodes.forEach((node) => {
            lazyLoad(node, () => syncCheckedValue(false, forced));
          });
        } else {
          syncCheckedValue(true, forced);
        }
      } else {
        const values = multiple ? arrays.castArray(modelValue) : [modelValue];
        const nodes = arrays.unique(
          values.map(
            (val) => store$1 == null ? void 0 : store$1.getNodeByValue(val, leafOnly)
          )
        );
        syncMenuState(nodes, forced);
        checkedValue.value = lodashUnified.cloneDeep(modelValue != null ? modelValue : void 0);
      }
    };
    const syncMenuState = (newCheckedNodes, reserveExpandingState = true) => {
      const { checkStrictly } = config$1.value;
      const oldNodes = checkedNodes.value;
      const newNodes = newCheckedNodes.filter(
        (node) => !!node && (checkStrictly || node.isLeaf)
      );
      const oldExpandingNode = store$1 == null ? void 0 : store$1.getSameNode(expandingNode.value);
      const newExpandingNode = reserveExpandingState && oldExpandingNode || newNodes[0];
      if (newExpandingNode) {
        newExpandingNode.pathNodes.forEach((node) => expandNode(node, true));
      } else {
        expandingNode.value = void 0;
      }
      oldNodes.forEach((node) => node.doCheck(false));
      vue.reactive(newNodes).forEach((node) => node.doCheck(true));
      checkedNodes.value = newNodes;
      vue.nextTick(scrollToExpandingNode);
    };
    const scrollToExpandingNode = () => {
      if (!core.isClient) return;
      menuList.value.forEach((menu) => {
        const menuElement = menu == null ? void 0 : menu.$el;
        if (menuElement) {
          const container = menuElement.querySelector(
            `.${ns.namespace.value}-scrollbar__wrap`
          );
          let activeNode = menuElement.querySelector(
            `.${ns.b("node")}.in-active-path`
          );
          if (!activeNode) {
            const activeElements = menuElement.querySelectorAll(
              `.${ns.b("node")}.${ns.is("active")}`
            );
            activeNode = activeElements[activeElements.length - 1];
          }
          scroll.scrollIntoView(container, activeNode);
        }
      });
    };
    const handleKeyDown = (e) => {
      const target = e.target;
      const code = event$1.getEventCode(e);
      switch (code) {
        case aria.EVENT_CODE.up:
        case aria.EVENT_CODE.down: {
          e.preventDefault();
          const distance = code === aria.EVENT_CODE.up ? -1 : 1;
          aria$1.focusNode(
            aria$1.getSibling(
              target,
              distance,
              `.${ns.b("node")}[tabindex="-1"]`
            )
          );
          break;
        }
        case aria.EVENT_CODE.left: {
          e.preventDefault();
          const preMenu = menuList.value[utils.getMenuIndex(target) - 1];
          const expandedNode = preMenu == null ? void 0 : preMenu.$el.querySelector(
            `.${ns.b("node")}[aria-expanded="true"]`
          );
          aria$1.focusNode(expandedNode);
          break;
        }
        case aria.EVENT_CODE.right: {
          e.preventDefault();
          const nextMenu = menuList.value[utils.getMenuIndex(target) + 1];
          const firstNode = nextMenu == null ? void 0 : nextMenu.$el.querySelector(
            `.${ns.b("node")}[tabindex="-1"]`
          );
          aria$1.focusNode(firstNode);
          break;
        }
        case aria.EVENT_CODE.enter:
        case aria.EVENT_CODE.numpadEnter:
          utils.checkNode(target);
          break;
      }
    };
    vue.provide(
      types.CASCADER_PANEL_INJECTION_KEY,
      vue.reactive({
        config: config$1,
        expandingNode,
        checkedNodes,
        isHoverMenu,
        initialLoaded,
        renderLabelFn,
        lazyLoad,
        expandNode,
        handleCheckChange
      })
    );
    vue.watch(
      config$1,
      (newVal, oldVal) => {
        if (lodashUnified.isEqual(newVal, oldVal)) return;
        initStore();
      },
      {
        immediate: true
      }
    );
    vue.watch(() => props.options, initStore, {
      deep: true
    });
    vue.watch(
      () => props.modelValue,
      () => {
        manualChecked = false;
        syncCheckedValue();
      },
      {
        deep: true
      }
    );
    vue.watch(
      () => checkedValue.value,
      (val) => {
        if (!lodashUnified.isEqual(val, props.modelValue)) {
          emit(event.UPDATE_MODEL_EVENT, val);
          emit(event.CHANGE_EVENT, val);
        }
      }
    );
    const loadLazyRootNodes = () => {
      if (initialLoadedOnce.value) return;
      initStore();
    };
    vue.onBeforeUpdate(() => menuList.value = []);
    vue.onMounted(() => !types$1.isEmpty(props.modelValue) && syncCheckedValue());
    __expose({
      menuList,
      menus,
      checkedNodes,
      handleKeyDown,
      handleCheckChange,
      getFlattedNodes,
      /**
       * @description get an array of currently selected node,(leafOnly) whether only return the leaf checked nodes, default is `false`
       */
      getCheckedNodes,
      /**
       * @description clear checked nodes
       */
      clearCheckedNodes,
      calculateCheckedValue,
      scrollToExpandingNode,
      loadLazyRootNodes
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).b("panel"), vue.unref(ns).is("bordered", __props.border)]),
          onKeydown: handleKeyDown
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(menus.value, (menu, index) => {
              return vue.openBlock(), vue.createBlock(menu_vue_vue_type_script_setup_true_lang.default, {
                key: index,
                ref_for: true,
                ref: (item) => menuList.value[index] = item,
                index,
                nodes: [...menu]
              }, {
                empty: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "empty")
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["index", "nodes"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=index.vue2.js.map
