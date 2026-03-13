import { buildProps, definePropType } from '../../../../utils/vue/props/runtime.mjs';

const svPanelProps = buildProps({
  color: {
    type: definePropType(Object),
    required: true
  },
  disabled: Boolean
});

export { svPanelProps };
//# sourceMappingURL=sv-panel.mjs.map
