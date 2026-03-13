'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splitter = require('./splitter.js');
var vue = require('vue');
var type = require('./type.js');
var useContainer = require('./hooks/useContainer.js');
var useResize = require('./hooks/useResize.js');
var useSize = require('./hooks/useSize.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-ordered-children/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElSplitter"
  },
  __name: "splitter",
  props: splitter.splitterProps,
  emits: splitter.splitterEmits,
  setup(__props, { emit: __emit }) {
    const ns = index.useNamespace("splitter");
    const emits = __emit;
    const props = __props;
    const layout = vue.toRef(props, "layout");
    const lazy = vue.toRef(props, "lazy");
    const { containerEl, containerSize } = useContainer.useContainer(layout);
    const {
      removeChild: unregisterPanel,
      children: panels,
      addChild: registerPanel,
      ChildrenSorter: PanelsSorter
    } = index$1.useOrderedChildren(vue.getCurrentInstance(), "ElSplitterPanel");
    vue.watch(panels, () => {
      movingIndex.value = null;
      panels.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    const { percentSizes, pxSizes } = useSize.useSize(panels, containerSize);
    const {
      lazyOffset,
      movingIndex,
      onMoveStart,
      onMoving,
      onMoveEnd,
      onCollapse
    } = useResize.useResize(panels, containerSize, pxSizes, lazy);
    const splitterStyles = vue.computed(() => {
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
      await vue.nextTick();
      emits("resizeEnd", index, pxSizes.value);
    };
    const onCollapsible = (index, type) => {
      onCollapse(index, type);
      emits("collapse", index, type, pxSizes.value);
    };
    vue.provide(
      type.splitterRootContextKey,
      vue.reactive({
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
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref_key: "containerEl",
          ref: containerEl,
          class: vue.normalizeClass([vue.unref(ns).b(), vue.unref(ns).e(layout.value)]),
          style: vue.normalizeStyle(splitterStyles.value)
        },
        [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createVNode(vue.unref(PanelsSorter)),
          vue.createCommentVNode(" Prevent iframe touch events from breaking "),
          vue.unref(movingIndex) ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass([vue.unref(ns).e("mask"), vue.unref(ns).e(`mask-${layout.value}`)])
            },
            null,
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=splitter.vue2.js.map
