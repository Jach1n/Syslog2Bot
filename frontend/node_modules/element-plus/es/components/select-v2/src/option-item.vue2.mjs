import { defineComponent, inject } from 'vue';
import { useOption } from './useOption.mjs';
import { useProps } from './useProps.mjs';
import { optionV2Emits, optionV2Props } from './defaults.mjs';
import { selectV2InjectionKey } from './token.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = defineComponent({
  props: optionV2Props,
  emits: optionV2Emits,
  setup(props, { emit }) {
    const select = inject(selectV2InjectionKey);
    const ns = useNamespace("select");
    const { hoverItem, selectOptionClick } = useOption(props, { emit });
    const { getLabel } = useProps(select.props);
    const contentId = select.contentId;
    return {
      ns,
      contentId,
      hoverItem,
      selectOptionClick,
      getLabel
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=option-item.vue2.mjs.map
