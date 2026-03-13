import _sfc_main$1 from './src/carousel.vue2.mjs';
import _sfc_main from './src/carousel-item.vue2.mjs';
export { carouselEmits, carouselProps } from './src/carousel.mjs';
export { carouselItemProps } from './src/carousel-item.mjs';
export { CAROUSEL_ITEM_NAME, carouselContextKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElCarousel = withInstall(_sfc_main$1, {
  CarouselItem: _sfc_main
});
const ElCarouselItem = withNoopInstall(_sfc_main);

export { ElCarousel, ElCarouselItem, ElCarousel as default };
//# sourceMappingURL=index.mjs.map
