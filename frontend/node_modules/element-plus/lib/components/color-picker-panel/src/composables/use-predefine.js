'use strict';

var vue = require('vue');
var colorPickerPanel = require('../color-picker-panel.js');
var color = require('../utils/color.js');
var index = require('../../../../hooks/use-namespace/index.js');

const usePredefine = (props) => {
  const { currentColor } = vue.inject(colorPickerPanel.colorPickerPanelContextKey);
  const rgbaColors = vue.ref(parseColors(props.colors, props.color));
  vue.watch(
    () => currentColor.value,
    (val) => {
      const color$1 = new color.default({
        value: val,
        enableAlpha: props.enableAlpha
      });
      rgbaColors.value.forEach((item) => {
        item.selected = color$1.compare(item);
      });
    }
  );
  vue.watchEffect(() => {
    rgbaColors.value = parseColors(props.colors, props.color);
  });
  function handleSelect(index) {
    props.color.fromString(props.colors[index]);
  }
  function parseColors(colors, color$1) {
    return colors.map((value) => {
      const c = new color.default({
        value,
        enableAlpha: props.enableAlpha
      });
      c.selected = c.compare(color$1);
      return c;
    });
  }
  return {
    rgbaColors,
    handleSelect
  };
};
const usePredefineDOM = (props) => {
  const ns = index.useNamespace("color-predefine");
  const rootKls = vue.computed(() => [ns.b(), ns.is("disabled", props.disabled)]);
  const colorsKls = vue.computed(() => ns.e("colors"));
  function colorSelectorKls(item) {
    return [
      ns.e("color-selector"),
      ns.is("alpha", item.get("alpha") < 100),
      { selected: item.selected }
    ];
  }
  return {
    rootKls,
    colorsKls,
    colorSelectorKls
  };
};

exports.usePredefine = usePredefine;
exports.usePredefineDOM = usePredefineDOM;
//# sourceMappingURL=use-predefine.js.map
