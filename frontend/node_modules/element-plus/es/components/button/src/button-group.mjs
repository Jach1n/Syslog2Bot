import { buttonProps } from './button.mjs';
import { definePropType } from '../../../utils/vue/props/runtime.mjs';

const buttonGroupProps = {
  /**
   * @description control the size of buttons in this button-group
   */
  size: buttonProps.size,
  /**
   * @description control the type of buttons in this button-group
   */
  type: buttonProps.type,
  /**
   * @description display direction
   */
  direction: {
    type: definePropType(String),
    values: ["horizontal", "vertical"],
    default: "horizontal"
  }
};

export { buttonGroupProps };
//# sourceMappingURL=button-group.mjs.map
