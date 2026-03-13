import { defineComponent, inject, withDirectives, cloneVNode, Comment, Fragment, Text, createVNode } from 'vue';
import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective } from '../../../hooks/use-forward-ref/index.mjs';
import { NOOP, isObject } from '@vue/shared';
import { debugWarn } from '../../../utils/error.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const NAME = "ElOnlyChild";
const OnlyChild = /* @__PURE__ */ defineComponent({
  name: NAME,
  setup(_, {
    slots,
    attrs
  }) {
    var _a;
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective((_a = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a : NOOP);
    return () => {
      var _a2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, attrs);
      if (!defaultSlot) return null;
      const [firstLegitNode, length] = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        debugWarn(NAME, "no valid child node found");
        return null;
      }
      if (length > 1) {
        debugWarn(NAME, "requires exact only one valid child.");
      }
      return withDirectives(cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
    };
  }
});
function findFirstLegitChild(node) {
  if (!node) return [null, 0];
  const children = node;
  const len = children.filter((c) => c.type !== Comment).length;
  for (const child of children) {
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return [wrapTextContent(child), len];
        case Fragment:
          return findFirstLegitChild(child.children);
        default:
          return [child, len];
      }
    }
    return [wrapTextContent(child), len];
  }
  return [null, 0];
}
function wrapTextContent(s) {
  const ns = useNamespace("only-child");
  return createVNode("span", {
    "class": ns.e("content")
  }, [s]);
}

export { OnlyChild };
//# sourceMappingURL=only-child.mjs.map
