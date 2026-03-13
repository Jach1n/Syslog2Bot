'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../tooltip/index.js');
var avatar_vue_vue_type_script_setup_true_lang = require('./avatar.vue2.js');
var constants = require('./constants.js');
var avatarGroupProps = require('./avatar-group-props.js');
var index = require('../../../hooks/use-namespace/index.js');
var vnode = require('../../../utils/vue/vnode.js');

var AvatarGroup = /* @__PURE__ */ vue.defineComponent({
  name: "ElAvatarGroup",
  props: avatarGroupProps.avatarGroupProps,
  setup(props, {
    slots
  }) {
    const ns = index.useNamespace("avatar-group");
    vue.provide(constants.avatarGroupContextKey, vue.reactive({
      size: vue.toRef(props, "size"),
      shape: vue.toRef(props, "shape")
    }));
    return () => {
      var _a, _b;
      const avatars = vnode.flattedChildren((_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : []);
      let visibleAvatars = avatars;
      const showCollapseAvatar = props.collapseAvatars && avatars.length > props.maxCollapseAvatars;
      if (showCollapseAvatar) {
        visibleAvatars = avatars.slice(0, props.maxCollapseAvatars);
        const hiddenAvatars = avatars.slice(props.maxCollapseAvatars);
        visibleAvatars.push(vue.createVNode(index$1.ElTooltip, {
          "popperClass": props.popperClass,
          "popperStyle": props.popperStyle,
          "placement": props.placement,
          "effect": props.effect,
          "disabled": !props.collapseAvatarsTooltip
        }, {
          default: () => vue.createVNode(avatar_vue_vue_type_script_setup_true_lang.default, {
            "size": props.size,
            "shape": props.shape,
            "class": props.collapseClass,
            "style": props.collapseStyle
          }, {
            default: () => [vue.createTextVNode("+ "), hiddenAvatars.length]
          }),
          content: () => vue.createVNode("div", {
            "class": ns.e("collapse-avatars")
          }, [hiddenAvatars.map((node, idx) => {
            var _a2;
            return vue.isVNode(node) ? vue.cloneVNode(node, {
              key: (_a2 = node.key) != null ? _a2 : idx
            }) : node;
          })])
        }));
      }
      return vue.createVNode("div", {
        "class": ns.b()
      }, [visibleAvatars]);
    };
  }
});

exports.default = AvatarGroup;
//# sourceMappingURL=avatar-group.js.map
