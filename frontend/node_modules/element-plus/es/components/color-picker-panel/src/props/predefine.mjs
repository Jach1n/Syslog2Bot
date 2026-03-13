import { buildProps, definePropType } from '../../../../utils/vue/props/runtime.mjs';

const predefineProps = buildProps({
  colors: {
    type: definePropType(Array),
    required: true
  },
  color: {
    type: definePropType(Object),
    required: true
  },
  enableAlpha: {
    type: Boolean,
    required: true
  },
  disabled: Boolean
});

export { predefineProps };
//# sourceMappingURL=predefine.mjs.map
