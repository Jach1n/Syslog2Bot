import { InfoFilled, CircleCloseFilled, WarningFilled, SuccessFilled, Close, CircleClose, CircleCheck, Loading } from '@element-plus/icons-vue';
import { definePropType } from './props/runtime.mjs';

const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const CloseComponents = {
  Close
};
const TypeComponents = {
  Close,
  SuccessFilled,
  InfoFilled,
  WarningFilled,
  CircleCloseFilled
};
const TypeComponentsMap = {
  primary: InfoFilled,
  success: SuccessFilled,
  warning: WarningFilled,
  error: CircleCloseFilled,
  info: InfoFilled
};
const ValidateComponentsMap = {
  validating: Loading,
  success: CircleCheck,
  error: CircleClose
};

export { CloseComponents, TypeComponents, TypeComponentsMap, ValidateComponentsMap, iconPropType };
//# sourceMappingURL=icon.mjs.map
