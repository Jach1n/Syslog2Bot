'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var form_vue_vue_type_script_setup_true_lang = require('./src/form.vue2.js');
var formItem_vue_vue_type_script_setup_true_lang = require('./src/form-item.vue2.js');
var form = require('./src/form.js');
var formItem = require('./src/form-item.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');
var useFormCommonProps = require('./src/hooks/use-form-common-props.js');
var useFormItem = require('./src/hooks/use-form-item.js');

const ElForm = install.withInstall(form_vue_vue_type_script_setup_true_lang.default, {
  FormItem: formItem_vue_vue_type_script_setup_true_lang.default
});
const ElFormItem = install.withNoopInstall(formItem_vue_vue_type_script_setup_true_lang.default);

exports.formEmits = form.formEmits;
exports.formMetaProps = form.formMetaProps;
exports.formProps = form.formProps;
exports.formItemProps = formItem.formItemProps;
exports.formItemValidateStates = formItem.formItemValidateStates;
exports.formContextKey = constants.formContextKey;
exports.formItemContextKey = constants.formItemContextKey;
exports.useDisabled = useFormCommonProps.useDisabled;
exports.useFormDisabled = useFormCommonProps.useFormDisabled;
exports.useFormSize = useFormCommonProps.useFormSize;
exports.useSize = useFormCommonProps.useSize;
exports.useFormItem = useFormItem.useFormItem;
exports.useFormItemInputId = useFormItem.useFormItemInputId;
exports.ElForm = ElForm;
exports.ElFormItem = ElFormItem;
exports.default = ElForm;
//# sourceMappingURL=index.js.map
