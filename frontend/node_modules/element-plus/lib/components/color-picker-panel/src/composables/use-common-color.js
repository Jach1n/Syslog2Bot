'use strict';

var vue = require('vue');
var color = require('../utils/color.js');
var event = require('../../../../constants/event.js');

const useCommonColor = (props, emit) => {
  const color$1 = vue.reactive(
    new color.default({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || "",
      value: props.modelValue
    })
  );
  vue.watch(
    () => [props.colorFormat, props.showAlpha],
    () => {
      color$1.enableAlpha = props.showAlpha;
      color$1.format = props.colorFormat || color$1.format;
      color$1.doOnChange();
      emit(event.UPDATE_MODEL_EVENT, color$1.value);
    }
  );
  return {
    color: color$1
  };
};

exports.useCommonColor = useCommonColor;
//# sourceMappingURL=use-common-color.js.map
