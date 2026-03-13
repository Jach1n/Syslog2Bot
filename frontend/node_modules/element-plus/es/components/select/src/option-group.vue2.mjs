import { defineComponent, ref, getCurrentInstance, provide, reactive, toRefs, computed, onMounted, isVNode } from 'vue';
import { useMutationObserver } from '@vueuse/core';
import { selectGroupKey } from './token.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { castArray } from 'lodash-unified';
import { isArray } from '@vue/shared';

var _sfc_main = defineComponent({
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
    const ns = useNamespace("select");
    const groupRef = ref();
    const instance = getCurrentInstance();
    const children = ref([]);
    provide(
      selectGroupKey,
      reactive({
        ...toRefs(props)
      })
    );
    const visible = computed(
      () => children.value.some((option) => option.visible === true)
    );
    const isOption = (node) => {
      var _a;
      return node.type.name === "ElOption" && !!((_a = node.component) == null ? void 0 : _a.proxy);
    };
    const flattedChildren = (node) => {
      const nodes = castArray(node);
      const children2 = [];
      nodes.forEach((child) => {
        var _a;
        if (!isVNode(child)) return;
        if (isOption(child)) {
          children2.push(child.component.proxy);
        } else if (isArray(child.children) && child.children.length) {
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
    onMounted(() => {
      updateChildren();
    });
    useMutationObserver(groupRef, updateChildren, {
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

export { _sfc_main as default };
//# sourceMappingURL=option-group.vue2.mjs.map
