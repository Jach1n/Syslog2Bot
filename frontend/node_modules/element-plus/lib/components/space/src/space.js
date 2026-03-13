'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var item = require('./item.js');
var useSpace = require('./use-space.js');
var vnode = require('../../../utils/vue/vnode.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var size = require('../../../constants/size.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');

const spaceProps = runtime.buildProps({
  /**
   * @description Placement direction
   */
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  /**
   * @description Classname
   */
  class: {
    type: runtime.definePropType([
      String,
      Object,
      Array
    ]),
    default: ""
  },
  /**
   * @description Extra style rules
   */
  style: {
    type: runtime.definePropType([String, Array, Object]),
    default: ""
  },
  /**
   * @description Controls the alignment of items
   */
  alignment: {
    type: runtime.definePropType(String),
    default: "center"
  },
  /**
   * @description Prefix for space-items
   */
  prefixCls: {
    type: String
  },
  /**
   * @description Spacer
   */
  spacer: {
    type: runtime.definePropType([Object, String, Number, Array]),
    default: null,
    validator: (val) => vue.isVNode(val) || types.isNumber(val) || shared.isString(val)
  },
  /**
   * @description Auto wrapping
   */
  wrap: Boolean,
  /**
   * @description Whether to fill the container
   */
  fill: Boolean,
  /**
   * @description Ratio of fill
   */
  fillRatio: {
    type: Number,
    default: 100
  },
  /**
   * @description Spacing size
   */
  size: {
    type: [String, Array, Number],
    values: size.componentSizes,
    validator: (val) => {
      return types.isNumber(val) || shared.isArray(val) && val.length === 2 && val.every(types.isNumber);
    }
  }
});
const Space = vue.defineComponent({
  name: "ElSpace",
  props: spaceProps,
  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace.useSpace(props);
    function extractChildren(children, parentKey = "", extractedChildren = []) {
      const { prefixCls } = props;
      children.forEach((child, loopKey) => {
        if (vnode.isFragment(child)) {
          if (shared.isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (vnode.isFragment(nested) && shared.isArray(nested.children)) {
                extractChildren(
                  nested.children,
                  `${parentKey + key}-`,
                  extractedChildren
                );
              } else {
                if (vue.isVNode(nested) && (nested == null ? void 0 : nested.type) === vue.Comment) {
                  extractedChildren.push(nested);
                } else {
                  extractedChildren.push(
                    vue.createVNode(
                      item.default,
                      {
                        style: itemStyle.value,
                        prefixCls,
                        key: `nested-${parentKey + key}`
                      },
                      {
                        default: () => [nested]
                      },
                      vnode.PatchFlags.PROPS | vnode.PatchFlags.STYLE,
                      ["style", "prefixCls"]
                    )
                  );
                }
              }
            });
          }
        } else if (vnode.isValidElementNode(child)) {
          extractedChildren.push(
            vue.createVNode(
              item.default,
              {
                style: itemStyle.value,
                prefixCls,
                key: `LoopKey${parentKey + loopKey}`
              },
              {
                default: () => [child]
              },
              vnode.PatchFlags.PROPS | vnode.PatchFlags.STYLE,
              ["style", "prefixCls"]
            )
          );
        }
      });
      return extractedChildren;
    }
    return () => {
      var _a;
      const { spacer, direction } = props;
      const children = vue.renderSlot(slots, "default", { key: 0 }, () => []);
      if (((_a = children.children) != null ? _a : []).length === 0) return null;
      if (shared.isArray(children.children)) {
        let extractedChildren = extractChildren(children.children);
        if (spacer) {
          const len = extractedChildren.length - 1;
          extractedChildren = extractedChildren.reduce(
            (acc, child, idx) => {
              const children2 = [...acc, child];
              if (idx !== len) {
                children2.push(
                  vue.createVNode(
                    "span",
                    // adding width 100% for vertical alignment,
                    // when the spacer inherit the width from the
                    // parent, this span's width was not set, so space
                    // might disappear
                    {
                      style: [
                        itemStyle.value,
                        direction === "vertical" ? "width: 100%" : null
                      ],
                      key: idx
                    },
                    [
                      // if spacer is already a valid vnode, then append it to the current
                      // span element.
                      // otherwise, treat it as string.
                      vue.isVNode(spacer) ? spacer : vue.createTextVNode(spacer, vnode.PatchFlags.TEXT)
                    ],
                    vnode.PatchFlags.STYLE
                  )
                );
              }
              return children2;
            },
            []
          );
        }
        return vue.createVNode(
          "div",
          {
            class: classes.value,
            style: containerStyle.value
          },
          extractedChildren,
          vnode.PatchFlags.STYLE | vnode.PatchFlags.CLASS
        );
      }
      return children.children;
    };
  }
});

exports.default = Space;
exports.spaceProps = spaceProps;
//# sourceMappingURL=space.js.map
