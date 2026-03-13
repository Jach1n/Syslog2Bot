import { isEmpty, isUndefined } from '../../../utils/types.mjs';
import { isFunction, isArray } from '@vue/shared';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let uid = 0;
const calculatePathNodes = (node) => {
  const nodes = [node];
  let { parent } = node;
  while (parent) {
    nodes.unshift(parent);
    parent = parent.parent;
  }
  return nodes;
};
class Node {
  constructor(data, config, parent, root = false) {
    this.data = data;
    this.config = config;
    this.parent = parent;
    this.root = root;
    __publicField(this, "uid", uid++);
    __publicField(this, "level");
    __publicField(this, "value");
    __publicField(this, "label");
    __publicField(this, "pathNodes");
    __publicField(this, "pathValues");
    __publicField(this, "pathLabels");
    __publicField(this, "childrenData");
    __publicField(this, "children");
    __publicField(this, "text");
    __publicField(this, "loaded");
    /**
     * Is it checked
     *
     * @default false
     */
    __publicField(this, "checked", false);
    /**
     * Used to indicate the intermediate state of unchecked and fully checked child nodes
     *
     * @default false
     */
    __publicField(this, "indeterminate", false);
    /**
     * Loading Status
     *
     * @default false
     */
    __publicField(this, "loading", false);
    const { value: valueKey, label: labelKey, children: childrenKey } = config;
    const childrenData = data[childrenKey];
    const pathNodes = calculatePathNodes(this);
    this.level = root ? 0 : parent ? parent.level + 1 : 1;
    this.value = data[valueKey];
    this.label = data[labelKey];
    this.pathNodes = pathNodes;
    this.pathValues = pathNodes.map((node) => node.value);
    this.pathLabels = pathNodes.map((node) => node.label);
    this.childrenData = childrenData;
    this.children = (childrenData || []).map(
      (child) => new Node(child, config, this)
    );
    this.loaded = !config.lazy || this.isLeaf || !isEmpty(childrenData);
    this.text = "";
  }
  get isDisabled() {
    const { data, parent, config } = this;
    const { disabled, checkStrictly } = config;
    const isDisabled = isFunction(disabled) ? disabled(data, this) : !!data[disabled];
    return isDisabled || !checkStrictly && !!(parent == null ? void 0 : parent.isDisabled);
  }
  get isLeaf() {
    const { data, config, childrenData, loaded } = this;
    const { lazy, leaf } = config;
    const isLeaf = isFunction(leaf) ? leaf(data, this) : data[leaf];
    return isUndefined(isLeaf) ? lazy && !loaded ? false : !(isArray(childrenData) && childrenData.length) : !!isLeaf;
  }
  get valueByOption() {
    return this.config.emitPath ? this.pathValues : this.value;
  }
  appendChild(childData) {
    const { childrenData, children } = this;
    const node = new Node(childData, this.config, this);
    if (isArray(childrenData)) {
      childrenData.push(childData);
    } else {
      this.childrenData = [childData];
    }
    children.push(node);
    return node;
  }
  calcText(allLevels, separator) {
    const text = allLevels ? this.pathLabels.join(separator) : this.label;
    this.text = text;
    return text;
  }
  broadcast(checked) {
    this.children.forEach((child) => {
      var _a;
      if (child) {
        child.broadcast(checked);
        (_a = child.onParentCheck) == null ? void 0 : _a.call(child, checked);
      }
    });
  }
  emit() {
    var _a;
    const { parent } = this;
    if (parent) {
      (_a = parent.onChildCheck) == null ? void 0 : _a.call(parent);
      parent.emit();
    }
  }
  onParentCheck(checked) {
    if (!this.isDisabled) {
      this.setCheckState(checked);
    }
  }
  onChildCheck() {
    const { children } = this;
    const validChildren = children.filter((child) => !child.isDisabled);
    const checked = validChildren.length ? validChildren.every((child) => child.checked) : false;
    this.setCheckState(checked);
  }
  setCheckState(checked) {
    const totalNum = this.children.length;
    const checkedNum = this.children.reduce((c, p) => {
      const num = p.checked ? 1 : p.indeterminate ? 0.5 : 0;
      return c + num;
    }, 0);
    this.checked = this.loaded && this.children.filter((child) => !child.isDisabled).every((child) => child.loaded && child.checked) && checked;
    this.indeterminate = this.loaded && checkedNum !== totalNum && checkedNum > 0;
  }
  doCheck(checked) {
    if (this.checked === checked) return;
    const { checkStrictly, multiple } = this.config;
    if (checkStrictly || !multiple) {
      this.checked = checked;
    } else {
      this.broadcast(checked);
      this.setCheckState(checked);
      this.emit();
    }
  }
}

export { Node as default };
//# sourceMappingURL=node.mjs.map
