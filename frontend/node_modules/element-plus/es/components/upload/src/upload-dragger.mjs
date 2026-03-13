import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { isArray } from '@vue/shared';

const uploadDraggerProps = buildProps({
  disabled: {
    type: Boolean,
    default: void 0
  },
  directory: Boolean
});
const uploadDraggerEmits = {
  file: (file) => isArray(file)
};

export { uploadDraggerEmits, uploadDraggerProps };
//# sourceMappingURL=upload-dragger.mjs.map
