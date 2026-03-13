'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slider_vue_vue_type_script_setup_true_lang = require('./src/slider.vue2.js');
var slider = require('./src/slider.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElSlider = install.withInstall(slider_vue_vue_type_script_setup_true_lang.default);

exports.sliderEmits = slider.sliderEmits;
exports.sliderProps = slider.sliderProps;
exports.sliderContextKey = constants.sliderContextKey;
exports.ElSlider = ElSlider;
exports.default = ElSlider;
//# sourceMappingURL=index.js.map
