import { unref } from 'vue';
import { useTimeout } from '../use-timeout/index.mjs';
import { buildProps } from '../../utils/vue/props/runtime.mjs';
import { isNumber } from '../../utils/types.mjs';

const useDelayedToggleProps = buildProps({
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
  const { registerTimeout } = useTimeout();
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout();
  const onOpen = (event, delay = unref(showAfter)) => {
    registerTimeout(() => {
      open(event);
      const _autoClose = unref(autoClose);
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event);
        }, _autoClose);
      }
    }, delay);
  };
  const onClose = (event, delay = unref(hideAfter)) => {
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

export { useDelayedToggle, useDelayedToggleProps, useDelayedTogglePropsDefaults };
//# sourceMappingURL=index.mjs.map
