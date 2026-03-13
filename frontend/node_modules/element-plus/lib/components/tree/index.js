'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tree$1 = require('./src/tree.vue.js');
var tokens = require('./src/tokens.js');
var tree = require('./src/tree.js');
var install = require('../../utils/vue/install.js');

const ElTree = install.withInstall(tree$1.default);

exports.NODE_INSTANCE_INJECTION_KEY = tokens.NODE_INSTANCE_INJECTION_KEY;
exports.ROOT_TREE_INJECTION_KEY = tokens.ROOT_TREE_INJECTION_KEY;
exports.TREE_NODE_MAP_INJECTION_KEY = tokens.TREE_NODE_MAP_INJECTION_KEY;
exports.treeEmits = tree.treeEmits;
exports.treeProps = tree.treeProps;
exports.ElTree = ElTree;
exports.default = ElTree;
//# sourceMappingURL=index.js.map
