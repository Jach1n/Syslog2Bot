'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var datePickerPanel$1 = require('./src/date-picker-panel.js');
var constants = require('./src/constants.js');
var datePickerPanel = require('./src/props/date-picker-panel.js');
var install = require('../../utils/vue/install.js');

const ElDatePickerPanel = install.withInstall(datePickerPanel$1.default);

exports.ROOT_PICKER_INJECTION_KEY = constants.ROOT_PICKER_INJECTION_KEY;
exports.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY = constants.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY;
exports.datePickerPanelProps = datePickerPanel.datePickerPanelProps;
exports.ElDatePickerPanel = ElDatePickerPanel;
exports.default = ElDatePickerPanel;
//# sourceMappingURL=index.js.map
