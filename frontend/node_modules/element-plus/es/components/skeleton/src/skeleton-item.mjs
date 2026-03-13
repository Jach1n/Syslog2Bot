import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const skeletonItemProps = buildProps({
  /**
   * @description the current rendering skeleton type
   */
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
});

export { skeletonItemProps };
//# sourceMappingURL=skeleton-item.mjs.map
