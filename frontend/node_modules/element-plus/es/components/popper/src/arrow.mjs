import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const popperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
});
const popperArrowPropsDefaults = {
  arrowOffset: 5
};
const usePopperArrowProps = popperArrowProps;

export { popperArrowProps, popperArrowPropsDefaults, usePopperArrowProps };
//# sourceMappingURL=arrow.mjs.map
