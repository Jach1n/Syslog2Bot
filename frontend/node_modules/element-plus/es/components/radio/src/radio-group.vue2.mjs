import { radioGroupEmits, radioGroupProps, radioDefaultProps } from './radio-group.mjs';
import { defineComponent, ref, onMounted, computed, provide, reactive, toRefs, watch, createElementBlock, openBlock, unref, normalizeClass, renderSlot, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps, nextTick } from 'vue';
import { radioGroupKey } from './constants.mjs';
import { isEqual, omit } from 'lodash-unified';
import _sfc_main$2 from './radio.vue2.mjs';
import _sfc_main$1 from './radio-button.vue2.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useId } from '../../../hooks/use-id/index.mjs';
import { useFormItem, useFormItemInputId } from '../../form/src/hooks/use-form-item.mjs';
import { debugWarn } from '../../../utils/error.mjs';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';

const _hoisted_1 = ["id", "aria-label", "aria-labelledby"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElRadioGroup"
  },
  __name: "radio-group",
  props: radioGroupProps,
  emits: radioGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const radioId = useId();
    const radioGroupRef = ref();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = (value) => {
      emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => emit(CHANGE_EVENT, value));
    };
    onMounted(() => {
      const radios = radioGroupRef.value.querySelectorAll("[type=radio]");
      const firstLabel = radios[0];
      if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    });
    const name = computed(() => {
      return props.name || radioId.value;
    });
    const aliasProps = computed(() => ({
      ...radioDefaultProps,
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
    provide(
      radioGroupKey,
      reactive({
        ...toRefs(props),
        changeEvent,
        name
      })
    );
    watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: unref(groupId),
        ref_key: "radioGroupRef",
        ref: radioGroupRef,
        class: normalizeClass(unref(ns).b("group")),
        role: "radiogroup",
        "aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "radio-group" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem).labelId : void 0
      }, [
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
      ], 10, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=radio-group.vue2.mjs.map
