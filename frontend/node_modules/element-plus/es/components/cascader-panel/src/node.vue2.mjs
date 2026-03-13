import { defineComponent, inject, computed, createElementBlock, openBlock, normalizeClass, unref, createCommentVNode, createBlock, createVNode, withModifiers, withCtx, createElementVNode, Fragment } from 'vue';
import { ElCheckbox } from '../../checkbox/index.mjs';
import { ElRadio } from '../../radio/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { Check, Loading, ArrowRight } from '@element-plus/icons-vue';
import NodeContent from './node-content.mjs';
import { CASCADER_PANEL_INJECTION_KEY } from './types.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["id", "aria-haspopup", "aria-owns", "aria-expanded", "tabindex"];
var _sfc_main = /* @__PURE__ */ defineComponent({
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
    const panel = inject(CASCADER_PANEL_INJECTION_KEY);
    const ns = useNamespace("cascader-node");
    const isHoverMenu = computed(() => panel.isHoverMenu);
    const multiple = computed(() => panel.config.multiple);
    const checkStrictly = computed(() => panel.config.checkStrictly);
    const showPrefix = computed(() => panel.config.showPrefix);
    const checkedNodeId = computed(() => {
      var _a;
      return (_a = panel.checkedNodes[0]) == null ? void 0 : _a.uid;
    });
    const isDisabled = computed(() => props.node.isDisabled);
    const isLeaf = computed(() => props.node.isLeaf);
    const expandable = computed(
      () => checkStrictly.value && !isLeaf.value || !isDisabled.value
    );
    const inExpandingPath = computed(() => isInPath(panel.expandingNode));
    const inCheckedPath = computed(
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
      return openBlock(), createElementBlock("li", {
        id: `${__props.menuId}-${__props.node.uid}`,
        role: "menuitem",
        "aria-haspopup": !isLeaf.value,
        "aria-owns": isLeaf.value ? void 0 : __props.menuId,
        "aria-expanded": inExpandingPath.value,
        tabindex: expandable.value ? -1 : void 0,
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).is("selectable", checkStrictly.value),
          unref(ns).is("active", __props.node.checked),
          unref(ns).is("disabled", !expandable.value),
          inExpandingPath.value && "in-active-path",
          inCheckedPath.value && "in-checked-path"
        ]),
        onMouseenter: handleHoverExpand,
        onFocus: handleHoverExpand,
        onClick: handleClick
      }, [
        createCommentVNode(" prefix "),
        multiple.value && showPrefix.value ? (openBlock(), createBlock(unref(ElCheckbox), {
          key: 0,
          "model-value": __props.node.checked,
          indeterminate: __props.node.indeterminate,
          disabled: isDisabled.value,
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"])),
          "onUpdate:modelValue": handleSelectCheck
        }, null, 8, ["model-value", "indeterminate", "disabled"])) : checkStrictly.value && showPrefix.value ? (openBlock(), createBlock(unref(ElRadio), {
          key: 1,
          "model-value": checkedNodeId.value,
          label: __props.node.uid,
          disabled: isDisabled.value,
          "onUpdate:modelValue": handleSelectCheck,
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"]))
        }, {
          default: withCtx(() => [
            createCommentVNode("\n        Add an empty element to avoid render label,\n        do not use empty fragment here for https://github.com/vuejs/vue-next/pull/2485\n      "),
            _cache[2] || (_cache[2] = createElementVNode(
              "span",
              null,
              null,
              -1
              /* CACHED */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model-value", "label", "disabled"])) : isLeaf.value && __props.node.checked ? (openBlock(), createBlock(unref(ElIcon), {
          key: 2,
          class: normalizeClass(unref(ns).e("prefix"))
        }, {
          default: withCtx(() => [
            createVNode(unref(Check))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["class"])) : createCommentVNode("v-if", true),
        createCommentVNode(" content "),
        createVNode(unref(NodeContent), { node: __props.node }, null, 8, ["node"]),
        createCommentVNode(" postfix "),
        !isLeaf.value ? (openBlock(), createElementBlock(
          Fragment,
          { key: 3 },
          [
            __props.node.loading ? (openBlock(), createBlock(unref(ElIcon), {
              key: 0,
              class: normalizeClass([unref(ns).is("loading"), unref(ns).e("postfix")])
            }, {
              default: withCtx(() => [
                createVNode(unref(Loading))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"])) : (openBlock(), createBlock(unref(ElIcon), {
              key: 1,
              class: normalizeClass(["arrow-right", unref(ns).e("postfix")])
            }, {
              default: withCtx(() => [
                createVNode(unref(ArrowRight))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["class"]))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=node.vue2.mjs.map
