import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { isObject, isString } from '@vue/shared';

const selectControllerProps = buildProps({
  date: {
    type: definePropType(Object),
    required: true
  },
  formatter: {
    type: definePropType(Function)
  }
});
const selectControllerEmits = {
  "date-change": (date) => isObject(date) || isString(date)
};

export { selectControllerEmits, selectControllerProps };
//# sourceMappingURL=select-controller.mjs.map
