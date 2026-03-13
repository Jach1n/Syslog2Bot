import { pick } from 'lodash-unified';
import { buildProps } from '../../utils/vue/props/runtime.mjs';

const ariaProps = buildProps({
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel: String,
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  /**
   * @description native `aria-controls` attribute
   */
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick(ariaProps, arias);
};

export { ariaProps, useAriaProps };
//# sourceMappingURL=index.mjs.map
