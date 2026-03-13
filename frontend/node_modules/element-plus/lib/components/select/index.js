'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var select$1 = require('./src/select.vue.js');
var option = require('./src/option.vue.js');
var optionGroup = require('./src/option-group.vue.js');
var token = require('./src/token.js');
var select = require('./src/select.js');
var install = require('../../utils/vue/install.js');

const ElSelect = install.withInstall(select$1.default, {
  Option: option.default,
  OptionGroup: optionGroup.default
});
const ElOption = install.withNoopInstall(option.default);
const ElOptionGroup = install.withNoopInstall(optionGroup.default);

exports.selectGroupKey = token.selectGroupKey;
exports.selectKey = token.selectKey;
exports.selectEmits = select.selectEmits;
exports.selectProps = select.selectProps;
exports.ElOption = ElOption;
exports.ElOptionGroup = ElOptionGroup;
exports.ElSelect = ElSelect;
exports.default = ElSelect;
//# sourceMappingURL=index.js.map
