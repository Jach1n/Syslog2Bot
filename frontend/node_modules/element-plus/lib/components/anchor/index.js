'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var anchor_vue_vue_type_script_setup_true_lang = require('./src/anchor.vue2.js');
var anchorLink_vue_vue_type_script_setup_true_lang = require('./src/anchor-link.vue2.js');
var anchor = require('./src/anchor.js');
var install = require('../../utils/vue/install.js');

const ElAnchor = install.withInstall(anchor_vue_vue_type_script_setup_true_lang.default, {
  AnchorLink: anchorLink_vue_vue_type_script_setup_true_lang.default
});
const ElAnchorLink = install.withNoopInstall(anchorLink_vue_vue_type_script_setup_true_lang.default);

exports.anchorEmits = anchor.anchorEmits;
exports.anchorProps = anchor.anchorProps;
exports.ElAnchor = ElAnchor;
exports.ElAnchorLink = ElAnchorLink;
exports.default = ElAnchor;
//# sourceMappingURL=index.js.map
