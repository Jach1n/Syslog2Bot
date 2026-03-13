import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const carouselItemProps = buildProps({
  /**
   * @description name of the item, can be used in `setActiveItem`
   */
  name: { type: String, default: "" },
  /**
   * @description text content for the corresponding indicator
   */
  label: {
    type: [String, Number],
    default: ""
  }
});

export { carouselItemProps };
//# sourceMappingURL=carousel-item.mjs.map
