'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');

const ExpandIcon = (props) => {
  const {
    expanded,
    expandable,
    onExpand,
    style,
    size,
    ariaLabel
  } = props;
  const expandIconProps = {
    onClick: expandable ? () => onExpand(!expanded) : void 0,
    ariaLabel,
    ariaExpanded: expanded,
    class: props.class
  };
  return vue.createVNode("button", vue.mergeProps(expandIconProps, {
    "type": "button"
  }), [vue.createVNode(index.ElIcon, {
    "size": size,
    "style": style
  }, {
    default: () => [vue.createVNode(iconsVue.ArrowRight, null, null)]
  })]);
};
ExpandIcon.inheritAttrs = false;

exports.default = ExpandIcon;
//# sourceMappingURL=expand-icon.js.map
