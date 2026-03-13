'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var radioGroup = require('./radio-group.js');
var vue = require('vue');
var constants = require('./constants.js');
var lodashUnified = require('lodash-unified');
var radio_vue_vue_type_script_setup_true_lang = require('./radio.vue2.js');
var radioButton_vue_vue_type_script_setup_true_lang = require('./radio-button.vue2.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-id/index.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var error = require('../../../utils/error.js');
var event = require('../../../constants/event.js');

const _hoisted_1 = ["id", "aria-label", "aria-labelledby"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElRadioGroup"
  },
  __name: "radio-group",
  props: radioGroup.radioGroupProps,
  emits: radioGroup.radioGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("radio");
    const radioId = index$1.useId();
    const radioGroupRef = vue.ref();
    const { formItem } = useFormItem.useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItem.useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = (value) => {
      emit(event.UPDATE_MODEL_EVENT, value);
      vue.nextTick(() => emit(event.CHANGE_EVENT, value));
    };
    vue.onMounted(() => {
      const radios = radioGroupRef.value.querySelectorAll("[type=radio]");
      const firstLabel = radios[0];
      if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    });
    const name = vue.computed(() => {
      return props.name || radioId.value;
    });
    const aliasProps = vue.computed(() => ({
      ...radioGroup.radioDefaultProps,
      ...props.props
    }));
    const getOptionProps = (option) => {
      const { label, value, disabled } = aliasProps.value;
      const base = {
        label: option[label],
        value: option[value],
        disabled: option[disabled]
      };
      return { ...lodashUnified.omit(option, [label, value, disabled]), ...base };
    };
    const optionComponent = vue.computed(
      () => props.type === "button" ? radioButton_vue_vue_type_script_setup_true_lang.default : radio_vue_vue_type_script_setup_true_lang.default
    );
    vue.provide(
      constants.radioGroupKey,
      vue.reactive({
        ...vue.toRefs(props),
        changeEvent,
        name
      })
    );
    vue.watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !lodashUnified.isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => error.debugWarn(err));
        }
      }
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        id: vue.unref(groupId),
        ref_key: "radioGroupRef",
        ref: radioGroupRef,
        class: vue.normalizeClass(vue.unref(ns).b("group")),
        role: "radiogroup",
        "aria-label": !vue.unref(isLabeledByFormItem) ? __props.ariaLabel || "radio-group" : void 0,
        "aria-labelledby": vue.unref(isLabeledByFormItem) ? vue.unref(formItem).labelId : void 0
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(__props.options, (item, index) => {
              return vue.openBlock(), vue.createBlock(
                vue.resolveDynamicComponent(optionComponent.value),
                vue.mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)),
                null,
                16
                /* FULL_PROPS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ], 10, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=radio-group.vue2.js.map
