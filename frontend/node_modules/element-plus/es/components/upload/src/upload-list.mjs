import { uploadListTypes } from './upload.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { NOOP } from '@vue/shared';
import { mutable } from '../../../utils/typescript.mjs';

const uploadListProps = buildProps({
  files: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  handlePreview: {
    type: definePropType(Function),
    default: NOOP
  },
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin: {
    type: definePropType(String)
  }
});
const uploadListEmits = {
  remove: (file) => !!file
};

export { uploadListEmits, uploadListProps };
//# sourceMappingURL=upload-list.mjs.map
