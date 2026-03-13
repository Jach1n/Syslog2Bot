import { defineComponent, computed, reactive, toRefs, provide } from 'vue';
import { ElTooltip } from '../../tooltip/index.mjs';
import { ElTag } from '../../tag/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import ElSelectMenu from './select-dropdown.mjs';
import useSelect from './useSelect.mjs';
import { selectV2Emits, selectV2Props } from './defaults.mjs';
import { selectV2InjectionKey } from './token.mjs';
import ClickOutside from '../../../directives/click-outside/index.mjs';
import { isArray } from '@vue/shared';
import { useCalcInputWidth } from '../../../hooks/use-calc-input-width/index.mjs';
import { useId } from '../../../hooks/use-id/index.mjs';
import { BORDER_HORIZONTAL_WIDTH } from '../../../constants/form.mjs';

var _sfc_main = defineComponent({
  name: "ElSelectV2",
  components: {
    ElSelectMenu,
    ElTag,
    ElTooltip,
    ElIcon
  },
  directives: { ClickOutside },
  props: selectV2Props,
  emits: selectV2Emits,
  setup(props, { emit }) {
    const modelValue = computed(() => {
      const { modelValue: rawModelValue, multiple } = props;
      const fallback = multiple ? [] : void 0;
      if (isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback;
      }
      return multiple ? fallback : rawModelValue;
    });
    const API = useSelect(
      reactive({
        ...toRefs(props),
        modelValue
      }),
      emit
    );
    const { calculatorRef, inputStyle } = useCalcInputWidth();
    const contentId = useId();
    provide(selectV2InjectionKey, {
      props: reactive({
        ...toRefs(props),
        height: API.popupHeight,
        modelValue
      }),
      expanded: API.expanded,
      tooltipRef: API.tooltipRef,
      contentId,
      onSelect: API.onSelect,
      onHover: API.onHover,
      onKeyboardNavigate: API.onKeyboardNavigate,
      onKeyboardSelect: API.onKeyboardSelect
    });
    const selectedLabel = computed(() => {
      if (!props.multiple) {
        return API.states.selectedLabel;
      }
      return API.states.cachedOptions.map((i) => API.getLabel(i));
    });
    return {
      ...API,
      modelValue,
      selectedLabel,
      calculatorRef,
      inputStyle,
      contentId,
      BORDER_HORIZONTAL_WIDTH
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=select.vue2.mjs.map
