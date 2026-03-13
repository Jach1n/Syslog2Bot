'use strict';

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var shared = require('@vue/shared');
var error = require('../../../utils/error.js');

const SCOPE = "ElForm";
function useFormLabelWidth() {
  const potentialLabelWidthArr = vue.ref([]);
  const autoLabelWidth = vue.computed(() => {
    if (!potentialLabelWidthArr.value.length) return "0";
    const max = Math.max(...potentialLabelWidthArr.value);
    return max ? `${max}px` : "";
  });
  function getLabelWidthIndex(width) {
    const index = potentialLabelWidthArr.value.indexOf(width);
    if (index === -1 && autoLabelWidth.value === "0") {
      error.debugWarn(SCOPE, `unexpected width ${width}`);
    }
    return index;
  }
  function registerLabelWidth(val, oldVal) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.value.splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.value.push(val);
    }
  }
  function deregisterLabelWidth(val) {
    const index = getLabelWidthIndex(val);
    if (index > -1) {
      potentialLabelWidthArr.value.splice(index, 1);
    }
  }
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  };
}
const filterFields = (fields, props) => {
  const normalized = lodashUnified.castArray(props).map(
    (prop) => shared.isArray(prop) ? prop.join(".") : prop
  );
  return normalized.length > 0 ? fields.filter(
    (field) => field.propString && normalized.includes(field.propString)
  ) : fields;
};

exports.filterFields = filterFields;
exports.useFormLabelWidth = useFormLabelWidth;
//# sourceMappingURL=utils.js.map
