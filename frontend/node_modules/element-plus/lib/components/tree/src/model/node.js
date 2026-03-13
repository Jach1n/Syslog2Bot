'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var util = require('./util.js');
var shared = require('@vue/shared');
var types = require('../../../../utils/types.js');

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const getChildState = (node) => {
  let all = true;
  let none = true;
  let allWithoutDisable = true;
  let isEffectivelyChecked = true;
  for (let i = 0, j = node.length; i < j; i++) {
    const n = node[i];
    if (n.checked !== true || n.indeterminate) {
      all = false;
      if (!n.disabled) {
        allWithoutDisable = false;
      }
    }
    if (n.checked !== false || n.indeterminate) {
      none = false;
    }
    if (!n.isEffectivelyChecked) {
      isEffectivelyChecked = false;
    }
  }
  return {
    all,
    none,
    allWithoutDisable,
    half: !all && !none,
    isEffectivelyChecked
  };
};
const reInitChecked = function(node) {
  if (node.childNodes.length === 0 || node.loading) {
    node.isEffectivelyChecked = node.disabled || node.checked;
    return;
  }
  const { all, none, half, isEffectivelyChecked } = getChildState(
    node.childNodes
  );
  node.isEffectivelyChecked = isEffectivelyChecked;
  if (all) {
    node.checked = true;
    node.indeterminate = false;
  } else if (half) {
    node.checked = false;
    node.indeterminate = true;
  } else if (none) {
    node.checked = false;
    node.indeterminate = false;
  }
  const parent = node.parent;
  if (!parent || parent.level === 0) return;
  if (!node.store.checkStrictly) {
    reInitChecked(parent);
  }
};
const getPropertyFromData = function(node, prop) {
  const props = node.store.props;
  const data = node.data || {};
  const config = props[prop];
  if (shared.isFunction(config)) {
    return config(data, node);
  } else if (shared.isString(config)) {
    return data[config];
  } else if (types.isUndefined(config)) {
    const dataProp = data[prop];
    return types.isUndefined(dataProp) ? "" : dataProp;
  }
};
const setCanFocus = function(childNodes, focus) {
  childNodes.forEach((item) => {
    item.canFocus = focus;
    setCanFocus(item.childNodes, focus);
  });
};
let nodeIdSeed = 0;
class Node {
  constructor(options) {
    __publicField(this, "id");
    __publicField(this, "text");
    __publicField(this, "checked");
    __publicField(this, "indeterminate");
    __publicField(this, "data");
    __publicField(this, "expanded");
    __publicField(this, "parent");
    __publicField(this, "visible");
    __publicField(this, "isCurrent");
    __publicField(this, "store");
    __publicField(this, "isLeafByUser");
    __publicField(this, "isLeaf");
    __publicField(this, "canFocus");
    __publicField(this, "level");
    __publicField(this, "loaded");
    __publicField(this, "childNodes");
    __publicField(this, "loading");
    /**
     * Determines whether the current tree node is effectively checked.
     *
     * Rules:
     * 1. A disabled leaf node is always considered checked.
     * 2. A non-disabled leaf node reflects its actual checked state.
     * 3. A non-leaf node is considered checked only when:
     *    - All of its child nodes are effectively checked, and
     *    - Each child follows the same evaluation rules:
     *      - Disabled leaf nodes follow rule #1.
     *      - Non-leaf child nodes are recursively evaluated under this rule (#3).
     */
    __publicField(this, "isEffectivelyChecked", false);
    this.id = nodeIdSeed++;
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.expanded = false;
    this.parent = null;
    this.visible = true;
    this.isCurrent = false;
    this.canFocus = false;
    for (const name in options) {
      if (shared.hasOwn(options, name)) {
        this[name] = options[name];
      }
    }
    this.level = 0;
    this.loaded = false;
    this.childNodes = [];
    this.loading = false;
    if (this.parent) {
      this.level = this.parent.level + 1;
    }
  }
  initialize() {
    var _a;
    const store = this.store;
    if (!store) {
      throw new Error("[Node]store is required!");
    }
    store.registerNode(this);
    const props = store.props;
    if (props && typeof props.isLeaf !== "undefined") {
      const isLeaf = getPropertyFromData(this, "isLeaf");
      if (types.isBoolean(isLeaf)) {
        this.isLeafByUser = isLeaf;
      }
    }
    if (store.lazy !== true && this.data) {
      this.setData(this.data);
      if (store.defaultExpandAll) {
        this.expanded = true;
        this.canFocus = true;
      }
    } else if (this.level > 0 && store.lazy && store.defaultExpandAll && !this.isLeafByUser) {
      this.expand();
    }
    if (!shared.isArray(this.data)) {
      util.markNodeData(this, this.data);
    }
    if (!this.data) return;
    const defaultExpandedKeys = store.defaultExpandedKeys;
    const key = store.key;
    if (key && !lodashUnified.isNil(this.key) && defaultExpandedKeys && defaultExpandedKeys.includes(this.key)) {
      this.expand(null, store.autoExpandParent);
    }
    if (key && store.currentNodeKey !== void 0 && this.key === store.currentNodeKey) {
      store.currentNode && (store.currentNode.isCurrent = false);
      store.currentNode = this;
      store.currentNode.isCurrent = true;
    }
    if (store.lazy) {
      store._initDefaultCheckedNode(this);
    }
    this.updateLeafState();
    if (this.level === 1 || ((_a = this.parent) == null ? void 0 : _a.expanded) === true) this.canFocus = true;
  }
  setData(data) {
    if (!shared.isArray(data)) {
      util.markNodeData(this, data);
    }
    this.data = data;
    this.childNodes = [];
    let children;
    if (this.level === 0 && shared.isArray(this.data)) {
      children = this.data;
    } else {
      children = getPropertyFromData(this, "children") || [];
    }
    for (let i = 0, j = children.length; i < j; i++) {
      this.insertChild({ data: children[i] });
    }
  }
  get label() {
    return getPropertyFromData(this, "label");
  }
  get key() {
    const nodeKey = this.store.key;
    if (this.data) return this.data[nodeKey];
    return null;
  }
  get disabled() {
    return getPropertyFromData(this, "disabled");
  }
  get nextSibling() {
    const parent = this.parent;
    if (parent) {
      const index = parent.childNodes.indexOf(this);
      if (index > -1) {
        return parent.childNodes[index + 1];
      }
    }
    return null;
  }
  get previousSibling() {
    const parent = this.parent;
    if (parent) {
      const index = parent.childNodes.indexOf(this);
      if (index > -1) {
        return index > 0 ? parent.childNodes[index - 1] : null;
      }
    }
    return null;
  }
  contains(target, deep = true) {
    return (this.childNodes || []).some(
      (child) => child === target || deep && child.contains(target)
    );
  }
  remove() {
    const parent = this.parent;
    if (parent) {
      parent.removeChild(this);
    }
  }
  insertChild(child, index, batch) {
    if (!child) throw new Error("InsertChild error: child is required.");
    if (!(child instanceof Node)) {
      if (!batch) {
        const children = this.getChildren(true);
        if (!(children == null ? void 0 : children.includes(child.data))) {
          if (types.isUndefined(index) || index < 0) {
            children == null ? void 0 : children.push(child.data);
          } else {
            children == null ? void 0 : children.splice(index, 0, child.data);
          }
        }
      }
      Object.assign(child, {
        parent: this,
        store: this.store
      });
      child = vue.reactive(new Node(child));
      if (child instanceof Node) {
        child.initialize();
      }
    }
    child.level = this.level + 1;
    if (types.isUndefined(index) || index < 0) {
      this.childNodes.push(child);
    } else {
      this.childNodes.splice(index, 0, child);
    }
    this.updateLeafState();
  }
  insertBefore(child, ref) {
    let index;
    if (ref) {
      index = this.childNodes.indexOf(ref);
    }
    this.insertChild(child, index);
  }
  insertAfter(child, ref) {
    let index;
    if (ref) {
      index = this.childNodes.indexOf(ref);
      if (index !== -1) index += 1;
    }
    this.insertChild(child, index);
  }
  removeChild(child) {
    const children = this.getChildren() || [];
    const dataIndex = children.indexOf(child.data);
    if (dataIndex > -1) {
      children.splice(dataIndex, 1);
    }
    const index = this.childNodes.indexOf(child);
    if (index > -1) {
      this.store && this.store.deregisterNode(child);
      child.parent = null;
      this.childNodes.splice(index, 1);
    }
    this.updateLeafState();
  }
  removeChildByData(data) {
    const targetNode = this.childNodes.find((child) => child.data === data);
    if (targetNode) {
      this.removeChild(targetNode);
    }
  }
  expand(callback, expandParent) {
    const done = () => {
      if (expandParent) {
        let parent = this.parent;
        while (parent && parent.level > 0) {
          parent.expanded = true;
          parent = parent.parent;
        }
      }
      this.expanded = true;
      if (callback) callback();
      setCanFocus(this.childNodes, true);
    };
    if (this.shouldLoadData()) {
      this.loadData((data) => {
        if (shared.isArray(data)) {
          if (this.checked) {
            this.setChecked(true, true);
          } else if (!this.store.checkStrictly) {
            reInitChecked(this);
          }
          done();
        }
      });
    } else {
      done();
    }
  }
  doCreateChildren(array, defaultProps = {}) {
    array.forEach((item) => {
      this.insertChild(
        Object.assign({ data: item }, defaultProps),
        void 0,
        true
      );
    });
  }
  collapse() {
    this.expanded = false;
    setCanFocus(this.childNodes, false);
  }
  shouldLoadData() {
    return Boolean(this.store.lazy === true && this.store.load && !this.loaded);
  }
  updateLeafState() {
    if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== "undefined") {
      this.isLeaf = this.isLeafByUser;
      this.isEffectivelyChecked = this.isLeaf && this.disabled;
      return;
    }
    const childNodes = this.childNodes;
    if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
      this.isLeaf = !childNodes || childNodes.length === 0;
      this.isEffectivelyChecked = this.isLeaf && this.disabled;
      return;
    }
    this.isLeaf = false;
  }
  setChecked(value, deep, recursion, passValue) {
    this.indeterminate = value === "half";
    this.checked = value === true;
    this.isEffectivelyChecked = !this.childNodes.length && (this.disabled || this.checked);
    if (this.store.checkStrictly) return;
    if (!(this.shouldLoadData() && !this.store.checkDescendants)) {
      const handleDescendants = () => {
        if (deep) {
          const childNodes = this.childNodes;
          for (let i = 0, j = childNodes.length; i < j; i++) {
            const child = childNodes[i];
            passValue = passValue || value !== false;
            const isCheck = child.disabled && child.isLeaf ? child.checked : passValue;
            child.setChecked(isCheck, deep, true, passValue);
          }
          const { half, all, isEffectivelyChecked } = getChildState(childNodes);
          if (!all) {
            this.checked = all;
            this.indeterminate = half;
          }
          this.isEffectivelyChecked = !this.childNodes.length ? this.disabled || this.checked : isEffectivelyChecked;
        }
      };
      if (this.shouldLoadData()) {
        this.loadData(
          () => {
            handleDescendants();
            reInitChecked(this);
          },
          {
            checked: value !== false
          }
        );
        return;
      } else {
        handleDescendants();
      }
    }
    const parent = this.parent;
    if (!parent || parent.level === 0) return;
    if (!recursion) {
      reInitChecked(parent);
    }
  }
  getChildren(forceInit = false) {
    if (this.level === 0) return this.data;
    const data = this.data;
    if (!data) return null;
    const props = this.store.props;
    let children = "children";
    if (props) {
      children = props.children || "children";
    }
    if (types.isUndefined(data[children])) {
      data[children] = null;
    }
    if (forceInit && !data[children]) {
      data[children] = [];
    }
    return data[children];
  }
  updateChildren() {
    const newData = this.getChildren() || [];
    const oldData = this.childNodes.map((node) => node.data);
    const newDataMap = {};
    const newNodes = [];
    newData.forEach((item, index) => {
      const key = item[util.NODE_KEY];
      const isNodeExists = !!key && oldData.some((data) => (data == null ? void 0 : data[util.NODE_KEY]) === key);
      if (isNodeExists) {
        newDataMap[key] = { index, data: item };
      } else {
        newNodes.push({ index, data: item });
      }
    });
    if (!this.store.lazy) {
      oldData.forEach((item) => {
        if (!newDataMap[item == null ? void 0 : item[util.NODE_KEY]]) this.removeChildByData(item);
      });
    }
    newNodes.forEach(({ index, data }) => {
      this.insertChild({ data }, index);
    });
    this.updateLeafState();
  }
  loadData(callback, defaultProps = {}) {
    if (this.store.lazy === true && this.store.load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
      this.loading = true;
      const resolve = (children) => {
        this.childNodes = [];
        this.doCreateChildren(children, defaultProps);
        this.loaded = true;
        this.loading = false;
        this.updateLeafState();
        if (callback) {
          callback.call(this, children);
        }
      };
      const reject = () => {
        this.loading = false;
      };
      this.store.load(this, resolve, reject);
    } else {
      if (callback) {
        callback.call(this);
      }
    }
  }
  eachNode(callback) {
    const arr = [this];
    while (arr.length) {
      const node = arr.shift();
      arr.unshift(...node.childNodes);
      callback(node);
    }
  }
  reInitChecked() {
    if (this.store.checkStrictly) return;
    reInitChecked(this);
  }
}

exports.default = Node;
exports.getChildState = getChildState;
//# sourceMappingURL=node.js.map
