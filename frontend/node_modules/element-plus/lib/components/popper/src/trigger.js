'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const popperTriggerProps = runtime.buildProps({
  /** @description Indicates the reference element to which the popper is attached */
  virtualRef: {
    type: runtime.definePropType(Object)
  },
  /** @description Indicates whether virtual triggering is enabled */
  virtualTriggering: Boolean,
  onMouseenter: {
    type: runtime.definePropType(Function)
  },
  onMouseleave: {
    type: runtime.definePropType(Function)
  },
  onClick: {
    type: runtime.definePropType(Function)
  },
  onKeydown: {
    type: runtime.definePropType(Function)
  },
  onFocus: {
    type: runtime.definePropType(Function)
  },
  onBlur: {
    type: runtime.definePropType(Function)
  },
  onContextmenu: {
    type: runtime.definePropType(Function)
  },
  id: String,
  open: Boolean
});
const usePopperTriggerProps = popperTriggerProps;

exports.popperTriggerProps = popperTriggerProps;
exports.usePopperTriggerProps = usePopperTriggerProps;
//# sourceMappingURL=trigger.js.map
