import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const maskProps = buildProps({
  /**
   * @description mask's zIndex
   */
  zIndex: {
    type: Number,
    default: 1001
  },
  /**
   * @description whether to show the mask
   */
  visible: Boolean,
  /**
   * @description mask's fill
   */
  fill: {
    type: String,
    default: "rgba(0,0,0,0.5)"
  },
  /***
   * @description mask's transparent space position
   */
  pos: {
    type: definePropType(Object)
  },
  /**
   * @description whether the target element can be clickable, when using mask
   */
  targetAreaClickable: {
    type: Boolean,
    default: true
  }
});

export { maskProps };
//# sourceMappingURL=mask.mjs.map
