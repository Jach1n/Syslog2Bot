import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const COMPONENT_NAME = "ElOption";
const optionProps = buildProps({
  /**
   * @description value of option
   */
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  },
  /**
   * @description label of option, same as `value` if omitted
   */
  label: {
    type: [String, Number]
  },
  created: Boolean,
  /**
   * @description whether option is disabled
   */
  disabled: Boolean
});

export { COMPONENT_NAME, optionProps };
//# sourceMappingURL=option.mjs.map
