import { splitterEmits, splitterProps } from './splitter.mjs';
import { defineComponent, toRef, getCurrentInstance, watch, computed, provide, reactive, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, renderSlot, createVNode, createCommentVNode, nextTick } from 'vue';
import { splitterRootContextKey } from './type.mjs';
import { useContainer } from './hooks/useContainer.mjs';
import { useResize } from './hooks/useResize.mjs';
import { useSize } from './hooks/useSize.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useOrderedChildren } from '../../../hooks/use-ordered-children/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSplitter"
  },
  __name: "splitter",
  props: splitterProps,
  emits: splitterEmits,
  setup(__props, { emit: __emit }) {
    const ns = useNamespace("splitter");
    const emits = __emit;
    const props = __props;
    const layout = toRef(props, "layout");
    const lazy = toRef(props, "lazy");
    const { containerEl, containerSize } = useContainer(layout);
    const {
      removeChild: unregisterPanel,
      children: panels,
      addChild: registerPanel,
      ChildrenSorter: PanelsSorter
    } = useOrderedChildren(getCurrentInstance(), "ElSplitterPanel");
    watch(panels, () => {
      movingIndex.value = null;
      panels.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    const { percentSizes, pxSizes } = useSize(panels, containerSize);
    const {
      lazyOffset,
      movingIndex,
      onMoveStart,
      onMoving,
      onMoveEnd,
      onCollapse
    } = useResize(panels, containerSize, pxSizes, lazy);
    const splitterStyles = computed(() => {
      return {
        [ns.cssVarBlockName("bar-offset")]: lazy.value ? `${lazyOffset.value}px` : void 0
      };
    });
    const onResizeStart = (index) => {
      onMoveStart(index);
      emits("resizeStart", index, pxSizes.value);
    };
    const onResize = (index, offset) => {
      onMoving(index, offset);
      if (!lazy.value) {
        emits("resize", index, pxSizes.value);
      }
    };
    const onResizeEnd = async (index) => {
      onMoveEnd();
      await nextTick();
      emits("resizeEnd", index, pxSizes.value);
    };
    const onCollapsible = (index, type) => {
      onCollapse(index, type);
      emits("collapse", index, type, pxSizes.value);
    };
    provide(
      splitterRootContextKey,
      reactive({
        panels,
        percentSizes,
        pxSizes,
        layout,
        lazy,
        movingIndex,
        containerSize,
        onMoveStart: onResizeStart,
        onMoving: onResize,
        onMoveEnd: onResizeEnd,
        onCollapse: onCollapsible,
        registerPanel,
        unregisterPanel
      })
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "containerEl",
          ref: containerEl,
          class: normalizeClass([unref(ns).b(), unref(ns).e(layout.value)]),
          style: normalizeStyle(splitterStyles.value)
        },
        [
          renderSlot(_ctx.$slots, "default"),
          createVNode(unref(PanelsSorter)),
          createCommentVNode(" Prevent iframe touch events from breaking "),
          unref(movingIndex) ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("mask"), unref(ns).e(`mask-${layout.value}`)])
            },
            null,
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=splitter.vue2.mjs.map
