import _sfc_main$1 from './src/form.vue2.mjs';
import _sfc_main from './src/form-item.vue2.mjs';
export { formEmits, formMetaProps, formProps } from './src/form.mjs';
export { formItemProps, formItemValidateStates } from './src/form-item.mjs';
export { formContextKey, formItemContextKey } from './src/constants.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';
export { useDisabled, useFormDisabled, useFormSize, useSize } from './src/hooks/use-form-common-props.mjs';
export { useFormItem, useFormItemInputId } from './src/hooks/use-form-item.mjs';

const ElForm = withInstall(_sfc_main$1, {
  FormItem: _sfc_main
});
const ElFormItem = withNoopInstall(_sfc_main);

export { ElForm, ElFormItem, ElForm as default };
//# sourceMappingURL=index.mjs.map
