'use strict';

var vue = require('vue');
var index = require('../../../../hooks/use-id/index.js');
var constants = require('../constants.js');

const useFormItem = () => {
  const form = vue.inject(constants.formContextKey, void 0);
  const formItem = vue.inject(constants.formItemContextKey, void 0);
  return {
    form,
    formItem
  };
};
const useFormItemInputId = (props, {
  formItemContext,
  disableIdGeneration,
  disableIdManagement
}) => {
  if (!disableIdGeneration) {
    disableIdGeneration = vue.ref(false);
  }
  if (!disableIdManagement) {
    disableIdManagement = vue.ref(false);
  }
  const instance = vue.getCurrentInstance();
  const inLabel = () => {
    let parent = instance == null ? void 0 : instance.parent;
    while (parent) {
      if (parent.type.name === "ElFormItem") {
        return false;
      }
      if (parent.type.name === "ElLabelWrap") {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  };
  const inputId = vue.ref();
  let idUnwatch = void 0;
  const isLabeledByFormItem = vue.computed(() => {
    var _a;
    return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && ((_a = formItemContext.inputIds) == null ? void 0 : _a.length) <= 1);
  });
  vue.onMounted(() => {
    idUnwatch = vue.watch(
      [vue.toRef(props, "id"), disableIdGeneration],
      ([id, disableIdGeneration2]) => {
        const newId = id != null ? id : !disableIdGeneration2 ? index.useId().value : void 0;
        if (newId !== inputId.value) {
          if ((formItemContext == null ? void 0 : formItemContext.removeInputId) && !inLabel()) {
            inputId.value && formItemContext.removeInputId(inputId.value);
            if (!(disableIdManagement == null ? void 0 : disableIdManagement.value) && !disableIdGeneration2 && newId) {
              formItemContext.addInputId(newId);
            }
          }
          inputId.value = newId;
        }
      },
      { immediate: true }
    );
  });
  vue.onUnmounted(() => {
    idUnwatch && idUnwatch();
    if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
      inputId.value && formItemContext.removeInputId(inputId.value);
    }
  });
  return {
    isLabeledByFormItem,
    inputId
  };
};

exports.useFormItem = useFormItem;
exports.useFormItemInputId = useFormItemInputId;
//# sourceMappingURL=use-form-item.js.map
