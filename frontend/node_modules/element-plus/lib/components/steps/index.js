'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var steps_vue_vue_type_script_setup_true_lang = require('./src/steps.vue2.js');
var item_vue_vue_type_script_setup_true_lang = require('./src/item.vue2.js');
var item = require('./src/item.js');
var steps = require('./src/steps.js');
var tokens = require('./src/tokens.js');
var install = require('../../utils/vue/install.js');

const ElSteps = install.withInstall(steps_vue_vue_type_script_setup_true_lang.default, {
  Step: item_vue_vue_type_script_setup_true_lang.default
});
const ElStep = install.withNoopInstall(item_vue_vue_type_script_setup_true_lang.default);

exports.stepProps = item.stepProps;
exports.stepsEmits = steps.stepsEmits;
exports.stepsProps = steps.stepsProps;
exports.STEPS_INJECTION_KEY = tokens.STEPS_INJECTION_KEY;
exports.ElStep = ElStep;
exports.ElSteps = ElSteps;
exports.default = ElSteps;
//# sourceMappingURL=index.js.map
