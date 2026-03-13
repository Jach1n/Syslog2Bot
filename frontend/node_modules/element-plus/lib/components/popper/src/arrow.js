'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const popperArrowProps = runtime.buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
});
const popperArrowPropsDefaults = {
  arrowOffset: 5
};
const usePopperArrowProps = popperArrowProps;

exports.popperArrowProps = popperArrowProps;
exports.popperArrowPropsDefaults = popperArrowPropsDefaults;
exports.usePopperArrowProps = usePopperArrowProps;
//# sourceMappingURL=arrow.js.map
