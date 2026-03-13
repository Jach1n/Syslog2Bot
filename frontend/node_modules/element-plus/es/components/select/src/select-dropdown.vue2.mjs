import { defineComponent, inject, computed, ref, onMounted } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { selectKey } from './token.mjs';
import { BORDER_HORIZONTAL_WIDTH } from '../../../constants/form.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = defineComponent({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const select = inject(selectKey);
    const ns = useNamespace("select");
    const popperClass = computed(() => select.props.popperClass);
    const isMultiple = computed(() => select.props.multiple);
    const isFitInputWidth = computed(() => select.props.fitInputWidth);
    const minWidth = ref("");
    function updateMinWidth() {
      var _a;
      const offsetWidth = (_a = select.selectRef) == null ? void 0 : _a.offsetWidth;
      if (offsetWidth) {
        minWidth.value = `${offsetWidth - BORDER_HORIZONTAL_WIDTH}px`;
      } else {
        minWidth.value = "";
      }
    }
    onMounted(() => {
      updateMinWidth();
      useResizeObserver(select.selectRef, updateMinWidth);
    });
    return {
      ns,
      minWidth,
      popperClass,
      isMultiple,
      isFitInputWidth
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=select-dropdown.vue2.mjs.map
