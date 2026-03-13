'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkTag = require('./check-tag.js');
var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');
var event = require('../../../constants/event.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCheckTag"
  },
  __name: "check-tag",
  props: checkTag.checkTagProps,
  emits: checkTag.checkTagEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("check-tag");
    const containerKls = vue.computed(() => [
      ns.b(),
      ns.is("checked", props.checked),
      ns.is("disabled", props.disabled),
      ns.m(props.type || "primary")
    ]);
    const handleChange = () => {
      if (props.disabled) return;
      const checked = !props.checked;
      emit(event.CHANGE_EVENT, checked);
      emit("update:checked", checked);
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "span",
        {
          class: vue.normalizeClass(containerKls.value),
          onClick: handleChange
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=check-tag.vue2.js.map
