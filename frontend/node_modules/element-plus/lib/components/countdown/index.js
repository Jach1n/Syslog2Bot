'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var countdown_vue_vue_type_script_setup_true_lang = require('./src/countdown.vue2.js');
var countdown = require('./src/countdown.js');
var install = require('../../utils/vue/install.js');

const ElCountdown = install.withInstall(countdown_vue_vue_type_script_setup_true_lang.default);

exports.countdownEmits = countdown.countdownEmits;
exports.countdownProps = countdown.countdownProps;
exports.ElCountdown = ElCountdown;
exports.default = ElCountdown;
//# sourceMappingURL=index.js.map
