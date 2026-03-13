'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var datePicker = require('./src/date-picker.js');
var props = require('./src/props.js');
var install = require('../../utils/vue/install.js');

const ElDatePicker = install.withInstall(datePicker.default);

exports.datePickerProps = props.datePickerProps;
exports.ElDatePicker = ElDatePicker;
exports.default = ElDatePicker;
//# sourceMappingURL=index.js.map
