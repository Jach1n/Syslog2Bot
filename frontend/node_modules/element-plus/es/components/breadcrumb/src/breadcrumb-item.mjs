import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const breadcrumbItemProps = buildProps({
  /**
   * @description target route of the link, same as `to` of `vue-router`
   */
  to: {
    type: definePropType([String, Object]),
    default: ""
  },
  /**
   * @description if `true`, the navigation will not leave a history record
   */
  replace: Boolean
});

export { breadcrumbItemProps };
//# sourceMappingURL=breadcrumb-item.mjs.map
