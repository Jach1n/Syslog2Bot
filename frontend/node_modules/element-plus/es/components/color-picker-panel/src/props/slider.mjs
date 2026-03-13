import { buildProps, definePropType } from '../../../../utils/vue/props/runtime.mjs';

const alphaSliderProps = buildProps({
  color: {
    type: definePropType(Object),
    required: true
  },
  vertical: Boolean,
  disabled: Boolean
});
const hueSliderProps = alphaSliderProps;

export { alphaSliderProps, hueSliderProps };
//# sourceMappingURL=slider.mjs.map
