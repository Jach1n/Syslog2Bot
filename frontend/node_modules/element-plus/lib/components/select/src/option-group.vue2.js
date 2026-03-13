'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var token = require('./token.js');
var index = require('../../../hooks/use-namespace/index.js');
var lodashUnified = require('lodash-unified');
var shared = require('@vue/shared');

var _sfc_main = vue.defineComponent({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    /**
     * @description name of the group
     */
    label: String,
    /**
     * @description whether to disable all options in this group
     */
    disabled: Boolean
  },
  setup(props) {
    const ns = index.useNamespace("select");
    const groupRef = vue.ref();
    const instance = vue.getCurrentInstance();
    const children = vue.ref([]);
    vue.provide(
      token.selectGroupKey,
      vue.reactive({
        ...vue.toRefs(props)
      })
    );
    const visible = vue.computed(
      () => children.value.some((option) => option.visible === true)
    );
    const isOption = (node) => {
      var _a;
      return node.type.name === "ElOption" && !!((_a = node.component) == null ? void 0 : _a.proxy);
    };
    const flattedChildren = (node) => {
      const nodes = lodashUnified.castArray(node);
      const children2 = [];
      nodes.forEach((child) => {
        var _a;
        if (!vue.isVNode(child)) return;
        if (isOption(child)) {
          children2.push(child.component.proxy);
        } else if (shared.isArray(child.children) && child.children.length) {
          children2.push(...flattedChildren(child.children));
        } else if ((_a = child.component) == null ? void 0 : _a.subTree) {
          children2.push(...flattedChildren(child.component.subTree));
        }
      });
      return children2;
    };
    const updateChildren = () => {
      children.value = flattedChildren(instance.subTree);
    };
    vue.onMounted(() => {
      updateChildren();
    });
    core.useMutationObserver(groupRef, updateChildren, {
      attributes: true,
      subtree: true,
      childList: true
    });
    return {
      groupRef,
      visible,
      ns
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=option-group.vue2.js.map
