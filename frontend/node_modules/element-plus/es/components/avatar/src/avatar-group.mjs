import { defineComponent, provide, reactive, toRef, createVNode, cloneVNode, isVNode, createTextVNode } from 'vue';
import { ElTooltip } from '../../tooltip/index.mjs';
import _sfc_main from './avatar.vue2.mjs';
import { avatarGroupContextKey } from './constants.mjs';
import { avatarGroupProps } from './avatar-group-props.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { flattedChildren } from '../../../utils/vue/vnode.mjs';

var AvatarGroup = /* @__PURE__ */ defineComponent({
  name: "ElAvatarGroup",
  props: avatarGroupProps,
  setup(props, {
    slots
  }) {
    const ns = useNamespace("avatar-group");
    provide(avatarGroupContextKey, reactive({
      size: toRef(props, "size"),
      shape: toRef(props, "shape")
    }));
    return () => {
      var _a, _b;
      const avatars = flattedChildren((_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : []);
      let visibleAvatars = avatars;
      const showCollapseAvatar = props.collapseAvatars && avatars.length > props.maxCollapseAvatars;
      if (showCollapseAvatar) {
        visibleAvatars = avatars.slice(0, props.maxCollapseAvatars);
        const hiddenAvatars = avatars.slice(props.maxCollapseAvatars);
        visibleAvatars.push(createVNode(ElTooltip, {
          "popperClass": props.popperClass,
          "popperStyle": props.popperStyle,
          "placement": props.placement,
          "effect": props.effect,
          "disabled": !props.collapseAvatarsTooltip
        }, {
          default: () => createVNode(_sfc_main, {
            "size": props.size,
            "shape": props.shape,
            "class": props.collapseClass,
            "style": props.collapseStyle
          }, {
            default: () => [createTextVNode("+ "), hiddenAvatars.length]
          }),
          content: () => createVNode("div", {
            "class": ns.e("collapse-avatars")
          }, [hiddenAvatars.map((node, idx) => {
            var _a2;
            return isVNode(node) ? cloneVNode(node, {
              key: (_a2 = node.key) != null ? _a2 : idx
            }) : node;
          })])
        }));
      }
      return createVNode("div", {
        "class": ns.b()
      }, [visibleAvatars]);
    };
  }
});

export { AvatarGroup as default };
//# sourceMappingURL=avatar-group.mjs.map
