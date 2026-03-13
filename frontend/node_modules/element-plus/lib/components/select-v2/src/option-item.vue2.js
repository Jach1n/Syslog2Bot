'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var useOption = require('./useOption.js');
var useProps = require('./useProps.js');
var defaults = require('./defaults.js');
var token = require('./token.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = vue.defineComponent({
  props: defaults.optionV2Props,
  emits: defaults.optionV2Emits,
  setup(props, { emit }) {
    const select = vue.inject(token.selectV2InjectionKey);
    const ns = index.useNamespace("select");
    const { hoverItem, selectOptionClick } = useOption.useOption(props, { emit });
    const { getLabel } = useProps.useProps(select.props);
    const contentId = select.contentId;
    return {
      ns,
      contentId,
      hoverItem,
      selectOptionClick,
      getLabel
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=option-item.vue2.js.map
