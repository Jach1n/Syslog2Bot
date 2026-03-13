'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splitter_vue_vue_type_script_setup_true_lang = require('./src/splitter.vue2.js');
var splitPanel_vue_vue_type_script_setup_true_lang = require('./src/split-panel.vue2.js');
var splitter = require('./src/splitter.js');
var splitPanel = require('./src/split-panel.js');
var install = require('../../utils/vue/install.js');

const ElSplitter = install.withInstall(splitter_vue_vue_type_script_setup_true_lang.default, {
  SplitPanel: splitPanel_vue_vue_type_script_setup_true_lang.default
});
const ElSplitterPanel = install.withNoopInstall(splitPanel_vue_vue_type_script_setup_true_lang.default);

exports.splitterEmits = splitter.splitterEmits;
exports.splitterProps = splitter.splitterProps;
exports.splitterPanelEmits = splitPanel.splitterPanelEmits;
exports.splitterPanelProps = splitPanel.splitterPanelProps;
exports.ElSplitter = ElSplitter;
exports.ElSplitterPanel = ElSplitterPanel;
exports.default = ElSplitter;
//# sourceMappingURL=index.js.map
