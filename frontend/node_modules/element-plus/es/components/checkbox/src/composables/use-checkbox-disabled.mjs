import { inject, computed } from 'vue';
import { checkboxGroupContextKey } from '../constants.mjs';
import { formContextKey } from '../../../form/src/constants.mjs';
import { isUndefined } from '../../../../utils/types.mjs';
import { useFormDisabled } from '../../../form/src/hooks/use-form-common-props.mjs';

const useCheckboxDisabled = ({
  model,
  isChecked
}) => {
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const formContext = inject(formContextKey, void 0);
  const isLimitDisabled = computed(() => {
    var _a, _b;
    const max = (_a = checkboxGroup == null ? void 0 : checkboxGroup.max) == null ? void 0 : _a.value;
    const min = (_b = checkboxGroup == null ? void 0 : checkboxGroup.min) == null ? void 0 : _b.value;
    return !isUndefined(max) && model.value.length >= max && !isChecked.value || !isUndefined(min) && model.value.length <= min && isChecked.value;
  });
  const isDisabled = useFormDisabled(
    computed(() => {
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

export { useCheckboxDisabled };
//# sourceMappingURL=use-checkbox-disabled.mjs.map
