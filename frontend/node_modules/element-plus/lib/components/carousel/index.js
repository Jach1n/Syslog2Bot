'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var carousel_vue_vue_type_script_setup_true_lang = require('./src/carousel.vue2.js');
var carouselItem_vue_vue_type_script_setup_true_lang = require('./src/carousel-item.vue2.js');
var carousel = require('./src/carousel.js');
var carouselItem = require('./src/carousel-item.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElCarousel = install.withInstall(carousel_vue_vue_type_script_setup_true_lang.default, {
  CarouselItem: carouselItem_vue_vue_type_script_setup_true_lang.default
});
const ElCarouselItem = install.withNoopInstall(carouselItem_vue_vue_type_script_setup_true_lang.default);

exports.carouselEmits = carousel.carouselEmits;
exports.carouselProps = carousel.carouselProps;
exports.carouselItemProps = carouselItem.carouselItemProps;
exports.CAROUSEL_ITEM_NAME = constants.CAROUSEL_ITEM_NAME;
exports.carouselContextKey = constants.carouselContextKey;
exports.ElCarousel = ElCarousel;
exports.ElCarouselItem = ElCarouselItem;
exports.default = ElCarousel;
//# sourceMappingURL=index.js.map
