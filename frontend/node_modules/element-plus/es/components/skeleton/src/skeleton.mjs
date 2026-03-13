import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const skeletonProps = buildProps({
  /**
   * @description whether showing the animation
   */
  animated: Boolean,
  /**
   * @description how many fake items to render to the DOM
   */
  count: {
    type: Number,
    default: 1
  },
  /**
   * @description numbers of the row, only useful when no template slot were given
   */
  rows: {
    type: Number,
    default: 3
  },
  /**
   * @description whether showing the real DOM
   */
  loading: {
    type: Boolean,
    default: true
  },
  /**
   * @description rendering delay in milliseconds
   */
  throttle: {
    type: definePropType([Number, Object])
  }
});

export { skeletonProps };
//# sourceMappingURL=skeleton.mjs.map
