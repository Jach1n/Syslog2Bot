'use strict';

var vue = require('vue');
var constants = require('../constants.js');
var constants$1 = require('../../../form/src/constants.js');
var types = require('../../../../utils/types.js');
var useFormCommonProps = require('../../../form/src/hooks/use-form-common-props.js');

const useCheckboxDisabled = ({
  model,
  isChecked
}) => {
  const checkboxGroup = vue.inject(constants.checkboxGroupContextKey, void 0);
  const formContext = vue.inject(constants$1.formContextKey, void 0);
  const isLimitDisabled = vue.computed(() => {
    var _a, _b;
    const max = (_a = checkboxGroup == null ? void 0 : checkboxGroup.max) == null ? void 0 : _a.value;
    const min = (_b = checkboxGroup == null ? void 0 : checkboxGroup.min) == null ? void 0 : _b.value;
    return !types.isUndefined(max) && model.value.length >= max && !isChecked.value || !types.isUndefined(min) && model.value.length <= min && isChecked.value;
  });
  const isDisabled = useFormCommonProps.useFormDisabled(
    vue.computed(() => {
      var _a, _b;
      if (checkboxGroup === void 0) {
        return (_a = formContext == null ? void 0 : formContext.disabled) != null ? _a : isLimitDisabled.value;
      } else {
        return ((_b = checkboxGroup.disabled) == null ? void 0 : _b.value) || isLimitDisabled.value;
      }
    })
  );
  return {
    isDisabled,
    isLimitDisabled
  };
};

exports.useCheckboxDisabled = useCheckboxDisabled;
//# sourceMappingURL=use-checkbox-disabled.js.map
