'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../checkbox/index.js');
var index$2 = require('../../radio/index.js');
var index$3 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var nodeContent = require('./node-content.js');
var types = require('./types.js');
var index = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["id", "aria-haspopup", "aria-owns", "aria-expanded", "tabindex"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCascaderNode"
  },
  __name: "node",
  props: {
    node: {
      type: Object,
      required: true
    },
    menuId: String
  },
  emits: ["expand"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const panel = vue.inject(types.CASCADER_PANEL_INJECTION_KEY);
    const ns = index.useNamespace("cascader-node");
    const isHoverMenu = vue.computed(() => panel.isHoverMenu);
    const multiple = vue.computed(() => panel.config.multiple);
    const checkStrictly = vue.computed(() => panel.config.checkStrictly);
    const showPrefix = vue.computed(() => panel.config.showPrefix);
    const checkedNodeId = vue.computed(() => {
      var _a;
      return (_a = panel.checkedNodes[0]) == null ? void 0 : _a.uid;
    });
    const isDisabled = vue.computed(() => props.node.isDisabled);
    const isLeaf = vue.computed(() => props.node.isLeaf);
    const expandable = vue.computed(
      () => checkStrictly.value && !isLeaf.value || !isDisabled.value
    );
    const inExpandingPath = vue.computed(() => isInPath(panel.expandingNode));
    const inCheckedPath = vue.computed(
      () => checkStrictly.value && panel.checkedNodes.some(isInPath)
    );
    const isInPath = (node) => {
      var _a;
      const { level, uid } = props.node;
      return ((_a = node == null ? void 0 : node.pathNodes[level - 1]) == null ? void 0 : _a.uid) === uid;
    };
    const doExpand = () => {
      if (inExpandingPath.value) return;
      panel.expandNode(props.node);
    };
    const doCheck = (checked) => {
      const { node } = props;
      if (checked === node.checked) return;
      panel.handleCheckChange(node, checked);
    };
    const doLoad = () => {
      panel.lazyLoad(props.node, () => {
        if (!isLeaf.value) doExpand();
      });
    };
    const handleHoverExpand = (e) => {
      if (!isHoverMenu.value) return;
      handleExpand();
      !isLeaf.value && emit("expand", e);
    };
    const handleExpand = () => {
      const { node } = props;
      if (!expandable.value || node.loading) return;
      node.loaded ? doExpand() : doLoad();
    };
    const handleClick = () => {
      if (isLeaf.value && !isDisabled.value && !checkStrictly.value && !multiple.value) {
        handleCheck(true);
      } else if ((panel.config.checkOnClickNode && (multiple.value || checkStrictly.value) || isLeaf.value && panel.config.checkOnClickLeaf) && !isDisabled.value) {
        handleSelectCheck(!props.node.checked);
      } else if (!isHoverMenu.value) {
        handleExpand();
      }
    };
    const handleSelectCheck = (checked) => {
      if (checkStrictly.value) {
        doCheck(checked);
        if (props.node.loaded) {
          doExpand();
        }
      } else {
        handleCheck(checked);
      }
    };
    const handleCheck = (checked) => {
      if (!props.node.loaded) {
        doLoad();
      } else {
        doCheck(checked);
        !checkStrictly.value && doExpand();
      }
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("li", {
        id: `${__props.menuId}-${__props.node.uid}`,
        role: "menuitem",
        "aria-haspopup": !isLeaf.value,
        "aria-owns": isLeaf.value ? void 0 : __props.menuId,
        "aria-expanded": inExpandingPath.value,
        tabindex: expandable.value ? -1 : void 0,
        class: vue.normalizeClass([
          vue.unref(ns).b(),
          vue.unref(ns).is("selectable", checkStrictly.value),
          vue.unref(ns).is("active", __props.node.checked),
          vue.unref(ns).is("disabled", !expandable.value),
          inExpandingPath.value && "in-active-path",
          inCheckedPath.value && "in-checked-path"
        ]),
        onMouseenter: handleHoverExpand,
        onFocus: handleHoverExpand,
        onClick: handleClick
      }, [
        vue.createCommentVNode(" prefix "),
        multiple.value && showPrefix.value ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElCheckbox), {
          key: 0,
          "model-value": __props.node.checked,
          indeterminate: __props.node.indeterminate,
          disabled: isDisabled.value,
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"])),
          "onUpdate:modelValue": handleSelectCheck
        }, null, 8, ["model-value", "indeterminate", "disabled"])) : checkStrictly.value && showPrefix.value ? (vue.openBlock(), vue.createBlock(vue.unref(index$2.ElRadio), {
          key: 1,
          "model-value": checkedNodeId.value,
          label: __props.node.uid,
          disabled: isDisabled.value,
          "onUpdate:modelValue": handleSelectCheck,
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"]))
        }, {
          default: vue.withCtx(() => [
            vue.createCommentVNode("\n        Add an empty element to avoid render label,\n        do not use empty fragment here for https://github.com/vuejs/vue-next/pull/2485\n      "),
            _cache[2] || (_cache[2] = vue.createElementVNode(
              "span",
              null,
              null,
              -1
              /* CACHED */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model-value", "label", "disabled"])) : isLeaf.value && __props.node.checked ? (vue.openBlock(), vue.createBlock(vue.unref(index$3.ElIcon), {
          key: 2,
          class: vue.normalizeClass(vue.unref(ns).e("prefix"))
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.unref(iconsVue.Check))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(" content "),
        vue.createVNode(vue.unref(nodeContent.default), { node: __props.node }, null, 8, ["node"]),
        vue.createCommentVNode(" postfix "),
        !isLeaf.value ? (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          { key: 3 },
          [
            __props.node.loading ? (vue.openBlock(), vue.createBlock(vue.unref(index$3.ElIcon), {
              key: 0,
              class: vue.normalizeClass([vue.unref(ns).is("loading"), vue.unref(ns).e("postfix")])
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(iconsVue.Loading))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])) : (vue.openBlock(), vue.createBlock(vue.unref(index$3.ElIcon), {
              key: 1,
              class: vue.normalizeClass(["arrow-right", vue.unref(ns).e("postfix")])
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(iconsVue.ArrowRight))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"]))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : vue.createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=node.vue2.js.map
