import { InfoFilled, CircleCloseFilled, WarningFilled, CircleCheckFilled } from '@element-plus/icons-vue';
import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const IconMap = {
  primary: "icon-primary",
  success: "icon-success",
  warning: "icon-warning",
  error: "icon-error",
  info: "icon-info"
};
const IconComponentMap = {
  [IconMap.primary]: InfoFilled,
  [IconMap.success]: CircleCheckFilled,
  [IconMap.warning]: WarningFilled,
  [IconMap.error]: CircleCloseFilled,
  [IconMap.info]: InfoFilled
};
const resultProps = buildProps({
  /**
   * @description title of result
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description sub title of result
   */
  subTitle: {
    type: String,
    default: ""
  },
  /**
   * @description icon type of result
   */
  icon: {
    type: String,
    values: ["primary", "success", "warning", "info", "error"],
    default: "info"
  }
});

export { IconComponentMap, IconMap, resultProps };
//# sourceMappingURL=result.mjs.map
