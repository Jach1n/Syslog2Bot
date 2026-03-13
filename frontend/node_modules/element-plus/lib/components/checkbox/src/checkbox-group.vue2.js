'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var checkboxGroup = require('./checkbox-group.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var constants = require('./constants.js');
var checkbox_vue_vue_type_script_setup_true_lang = require('./checkbox.vue2.js');
var checkboxButton_vue_vue_type_script_setup_true_lang = require('./checkbox-button.vue2.js');
var index = require('../../../hooks/use-namespace/index.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var error = require('../../../utils/error.js');
var event = require('../../../constants/event.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCheckboxGroup"
  },
  __name: "checkbox-group",
  props: checkboxGroup.checkboxGroupProps,
  emits: checkboxGroup.checkboxGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("checkbox");
    const checkboxDisabled = useFormCommonProps.useFormDisabled();
    const { formItem } = useFormItem.useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItem.useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = async (value) => {
      emit(event.UPDATE_MODEL_EVENT, value);
      await vue.nextTick();
      emit(event.CHANGE_EVENT, value);
    };
    const modelValue = vue.computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      }
    });
    const aliasProps = vue.computed(() => ({
      ...checkboxGroup.checkboxDefaultProps,
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
      () => props.type === "button" ? checkboxButton_vue_vue_type_script_setup_true_lang.default : checkbox_vue_vue_type_script_setup_true_lang.default
    );
    vue.provide(constants.checkboxGroupContextKey, {
      ...lodashUnified.pick(vue.toRefs(props), [
        "size",
        "min",
        "max",
        "validateEvent",
        "fill",
        "textColor"
      ]),
      disabled: checkboxDisabled,
      modelValue,
      changeEvent
    });
    vue.watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !lodashUnified.isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => error.debugWarn(err));
        }
      }
    );
    return (_ctx, _cache) => {
      var _a;
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.tag), {
        id: vue.unref(groupId),
        class: vue.normalizeClass(vue.unref(ns).b("group")),
        role: "group",
        "aria-label": !vue.unref(isLabeledByFormItem) ? __props.ariaLabel || "checkbox-group" : void 0,
        "aria-labelledby": vue.unref(isLabeledByFormItem) ? (_a = vue.unref(formItem)) == null ? void 0 : _a.labelId : void 0
      }, {
        default: vue.withCtx(() => [
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
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["id", "class", "aria-label", "aria-labelledby"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=checkbox-group.vue2.js.map
