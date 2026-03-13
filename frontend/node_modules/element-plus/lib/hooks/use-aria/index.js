'use strict';

var lodashUnified = require('lodash-unified');
var runtime = require('../../utils/vue/props/runtime.js');

const ariaProps = runtime.buildProps({
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel: String,
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  /**
   * @description native `aria-controls` attribute
   */
  ariaControls: String
});
const useAriaProps = (arias) => {
  return lodashUnified.pick(ariaProps, arias);
};

exports.ariaProps = ariaProps;
exports.useAriaProps = useAriaProps;
//# sourceMappingURL=index.js.map
