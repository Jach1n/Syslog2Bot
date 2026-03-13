'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tabs = require('./src/tabs.js');
var tabPane_vue_vue_type_script_setup_true_lang = require('./src/tab-pane.vue2.js');
var tabBar = require('./src/tab-bar.js');
var tabNav = require('./src/tab-nav.js');
var tabPane = require('./src/tab-pane.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElTabs = install.withInstall(tabs.default, {
  TabPane: tabPane_vue_vue_type_script_setup_true_lang.default
});
const ElTabPane = install.withNoopInstall(tabPane_vue_vue_type_script_setup_true_lang.default);

exports.tabsEmits = tabs.tabsEmits;
exports.tabsProps = tabs.tabsProps;
exports.tabBarProps = tabBar.tabBarProps;
exports.tabNavEmits = tabNav.tabNavEmits;
exports.tabNavProps = tabNav.tabNavProps;
exports.tabPaneProps = tabPane.tabPaneProps;
exports.tabsRootContextKey = constants.tabsRootContextKey;
exports.ElTabPane = ElTabPane;
exports.ElTabs = ElTabs;
exports.default = ElTabs;
//# sourceMappingURL=index.js.map
