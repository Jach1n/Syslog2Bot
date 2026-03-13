import { isVNode, defineComponent, renderSlot, createVNode, createTextVNode, Comment } from 'vue';
import SpaceItem from './item.mjs';
import { useSpace } from './use-space.mjs';
import { PatchFlags, isFragment, isValidElementNode } from '../../../utils/vue/vnode.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { componentSizes } from '../../../constants/size.mjs';
import { isNumber } from '../../../utils/types.mjs';
import { isString, isArray } from '@vue/shared';

const spaceProps = buildProps({
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
    type: definePropType([
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
    type: definePropType([String, Array, Object]),
    default: ""
  },
  /**
   * @description Controls the alignment of items
   */
  alignment: {
    type: definePropType(String),
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
    type: definePropType([Object, String, Number, Array]),
    default: null,
    validator: (val) => isVNode(val) || isNumber(val) || isString(val)
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
    values: componentSizes,
    validator: (val) => {
      return isNumber(val) || isArray(val) && val.length === 2 && val.every(isNumber);
    }
  }
});
const Space = defineComponent({
  name: "ElSpace",
  props: spaceProps,
  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace(props);
    function extractChildren(children, parentKey = "", extractedChildren = []) {
      const { prefixCls } = props;
      children.forEach((child, loopKey) => {
        if (isFragment(child)) {
          if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              if (isFragment(nested) && isArray(nested.children)) {
                extractChildren(
                  nested.children,
                  `${parentKey + key}-`,
                  extractedChildren
                );
              } else {
                if (isVNode(nested) && (nested == null ? void 0 : nested.type) === Comment) {
                  extractedChildren.push(nested);
                } else {
                  extractedChildren.push(
                    createVNode(
                      SpaceItem,
                      {
                        style: itemStyle.value,
                        prefixCls,
                        key: `nested-${parentKey + key}`
                      },
                      {
                        default: () => [nested]
                      },
                      PatchFlags.PROPS | PatchFlags.STYLE,
                      ["style", "prefixCls"]
                    )
                  );
                }
              }
            });
          }
        } else if (isValidElementNode(child)) {
          extractedChildren.push(
            createVNode(
              SpaceItem,
              {
                style: itemStyle.value,
                prefixCls,
                key: `LoopKey${parentKey + loopKey}`
              },
              {
                default: () => [child]
              },
              PatchFlags.PROPS | PatchFlags.STYLE,
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
      const children = renderSlot(slots, "default", { key: 0 }, () => []);
      if (((_a = children.children) != null ? _a : []).length === 0) return null;
      if (isArray(children.children)) {
        let extractedChildren = extractChildren(children.children);
        if (spacer) {
          const len = extractedChildren.length - 1;
          extractedChildren = extractedChildren.reduce(
            (acc, child, idx) => {
              const children2 = [...acc, child];
              if (idx !== len) {
                children2.push(
                  createVNode(
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
                      isVNode(spacer) ? spacer : createTextVNode(spacer, PatchFlags.TEXT)
                    ],
                    PatchFlags.STYLE
                  )
                );
              }
              return children2;
            },
            []
          );
        }
        return createVNode(
          "div",
          {
            class: classes.value,
            style: containerStyle.value
          },
          extractedChildren,
          PatchFlags.STYLE | PatchFlags.CLASS
        );
      }
      return children.children;
    };
  }
});

export { Space as default, spaceProps };
//# sourceMappingURL=space.mjs.map
