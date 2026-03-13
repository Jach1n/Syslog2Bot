import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const iconProps = buildProps({
  /**
   * @description SVG icon size, size x size
   */
  size: {
    type: definePropType([Number, String])
  },
  /**
   * @description SVG tag's fill attribute
   */
  color: {
    type: String
  }
});

export { iconProps };
//# sourceMappingURL=icon.mjs.map
