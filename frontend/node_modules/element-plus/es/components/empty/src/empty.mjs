import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const emptyProps = buildProps({
  /**
   * @description image URL of empty
   */
  image: {
    type: String,
    default: ""
  },
  /**
   * @description image size (width) of empty
   */
  imageSize: Number,
  /**
   * @description description of empty
   */
  description: {
    type: String,
    default: ""
  }
});

export { emptyProps };
//# sourceMappingURL=empty.mjs.map
