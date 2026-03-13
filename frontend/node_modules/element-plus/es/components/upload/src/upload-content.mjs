import { uploadBaseProps, uploadBasePropsDefaults } from './upload.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { NOOP } from '@vue/shared';

const uploadContentProps = buildProps({
  ...uploadBaseProps,
  beforeUpload: {
    type: definePropType(Function),
    default: NOOP
  },
  onRemove: {
    type: definePropType(Function),
    default: NOOP
  },
  onStart: {
    type: definePropType(Function),
    default: NOOP
  },
  onSuccess: {
    type: definePropType(
      Function
    ),
    default: NOOP
  },
  onProgress: {
    type: definePropType(Function),
    default: NOOP
  },
  onError: {
    type: definePropType(Function),
    default: NOOP
  },
  onExceed: {
    type: definePropType(Function),
    default: NOOP
  }
});
const uploadContentPropsDefaults = {
  ...uploadBasePropsDefaults,
  beforeUpload: NOOP,
  onRemove: NOOP,
  onStart: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  onExceed: NOOP
};

export { uploadContentProps, uploadContentPropsDefaults };
//# sourceMappingURL=upload-content.mjs.map
