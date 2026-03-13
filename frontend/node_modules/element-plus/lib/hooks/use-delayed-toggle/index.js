'use strict';

var vue = require('vue');
var index = require('../use-timeout/index.js');
var runtime = require('../../utils/vue/props/runtime.js');
var types = require('../../utils/types.js');

const useDelayedToggleProps = runtime.buildProps({
  /**
   * @description delay of appearance, in millisecond, not valid in controlled mode
   */
  showAfter: {
    type: Number,
    default: 0
  },
  /**
   * @description delay of disappear, in millisecond, not valid in controlled mode
   */
  hideAfter: {
    type: Number,
    default: 200
  },
  /**
   * @description disappear automatically, in millisecond, not valid in controlled mode
   */
  autoClose: {
    type: Number,
    default: 0
  }
});
const useDelayedTogglePropsDefaults = {
  showAfter: 0,
  hideAfter: 200,
  autoClose: 0
};
const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}) => {
  const { registerTimeout } = index.useTimeout();
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = index.useTimeout();
  const onOpen = (event, delay = vue.unref(showAfter)) => {
    registerTimeout(() => {
      open(event);
      const _autoClose = vue.unref(autoClose);
      if (types.isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event);
        }, _autoClose);
      }
    }, delay);
  };
  const onClose = (event, delay = vue.unref(hideAfter)) => {
    cancelTimeoutForAutoClose();
    registerTimeout(() => {
      close(event);
    }, delay);
  };
  return {
    onOpen,
    onClose
  };
};

exports.useDelayedToggle = useDelayedToggle;
exports.useDelayedToggleProps = useDelayedToggleProps;
exports.useDelayedTogglePropsDefaults = useDelayedTogglePropsDefaults;
//# sourceMappingURL=index.js.map
