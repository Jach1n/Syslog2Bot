import { checkboxGroupEmits, checkboxGroupProps, checkboxDefaultProps } from './checkbox-group.mjs';
import { defineComponent, computed, provide, toRefs, watch, createBlock, openBlock, resolveDynamicComponent, normalizeClass, unref, withCtx, renderSlot, createElementBlock, Fragment, renderList, mergeProps, nextTick } from 'vue';
import { pick, isEqual, omit } from 'lodash-unified';
import { checkboxGroupContextKey } from './constants.mjs';
import _sfc_main$2 from './checkbox.vue2.mjs';
import _sfc_main$1 from './checkbox-button.vue2.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useFormDisabled } from '../../form/src/hooks/use-form-common-props.mjs';
import { useFormItem, useFormItemInputId } from '../../form/src/hooks/use-form-item.mjs';
import { debugWarn } from '../../../utils/error.mjs';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCheckboxGroup"
  },
  __name: "checkbox-group",
  props: checkboxGroupProps,
  emits: checkboxGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("checkbox");
    const checkboxDisabled = useFormDisabled();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = async (value) => {
      emit(UPDATE_MODEL_EVENT, value);
      await nextTick();
      emit(CHANGE_EVENT, value);
    };
    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      }
    });
    const aliasProps = computed(() => ({
      ...checkboxDefaultProps,
      ...props.props
    }));
    const getOptionProps = (option) => {
      const { label, value, disabled } = aliasProps.value;
      const base = {
        label: option[label],
        value: option[value],
        disabled: option[disabled]
      };
      return { ...omit(option, [label, value, disabled]), ...base };
    };
    const optionComponent = computed(
      () => props.type === "button" ? _sfc_main$1 : _sfc_main$2
    );
    provide(checkboxGroupContextKey, {
      ...pick(toRefs(props), [
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
    watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
        }
      }
    );
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
        id: unref(groupId),
        class: normalizeClass(unref(ns).b("group")),
        role: "group",
        "aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "checkbox-group" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? (_a = unref(formItem)) == null ? void 0 : _a.labelId : void 0
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.options, (item, index) => {
                return openBlock(), createBlock(
                  resolveDynamicComponent(optionComponent.value),
                  mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)),
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

export { _sfc_main as default };
//# sourceMappingURL=checkbox-group.vue2.mjs.map
