'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tour_vue_vue_type_script_setup_true_lang = require('./src/tour.vue2.js');
var step_vue_vue_type_script_setup_true_lang = require('./src/step.vue2.js');
var tour = require('./src/tour.js');
var step = require('./src/step.js');
var content = require('./src/content.js');
var install = require('../../utils/vue/install.js');

const ElTour = install.withInstall(tour_vue_vue_type_script_setup_true_lang.default, {
  TourStep: step_vue_vue_type_script_setup_true_lang.default
});
const ElTourStep = install.withNoopInstall(step_vue_vue_type_script_setup_true_lang.default);

exports.tourEmits = tour.tourEmits;
exports.tourProps = tour.tourProps;
exports.tourStepEmits = step.tourStepEmits;
exports.tourStepProps = step.tourStepProps;
exports.tourContentEmits = content.tourContentEmits;
exports.tourContentProps = content.tourContentProps;
exports.tourPlacements = content.tourPlacements;
exports.tourStrategies = content.tourStrategies;
exports.ElTour = ElTour;
exports.ElTourStep = ElTourStep;
exports.default = ElTour;
//# sourceMappingURL=index.js.map
