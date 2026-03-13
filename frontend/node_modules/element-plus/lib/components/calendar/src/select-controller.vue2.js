'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var selectController = require('./select-controller.js');
var vue = require('vue');
var dayjs = require('dayjs');
var index$2 = require('../../select/index.js');
var index$3 = require('../../button/index.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-locale/index.js');
var shared = require('@vue/shared');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "SelectController"
  },
  __name: "select-controller",
  props: selectController.selectControllerProps,
  emits: selectController.selectControllerEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const nsSelect = index.useNamespace("calendar-select");
    const { t, lang } = index$1.useLocale();
    const monthOptions = Array.from({ length: 12 }, (_, index) => {
      const actualMonth = index + 1;
      const label = shared.isFunction(props.formatter) ? props.formatter(actualMonth, "month") : actualMonth;
      return {
        value: actualMonth,
        label
      };
    });
    const yearValue = vue.computed(() => props.date.year());
    const monthValue = vue.computed(() => props.date.month() + 1);
    const yearOptions = vue.computed(() => {
      const years = [];
      for (let i = -10; i < 10; i++) {
        const year = yearValue.value + i;
        if (year > 0) {
          const label = shared.isFunction(props.formatter) ? props.formatter(year, "year") : year;
          years.push({ value: year, label });
        }
      }
      return years;
    });
    const handleYearChange = (year) => {
      emit(
        "date-change",
        dayjs(new Date(year, monthValue.value - 1, 1)).locale(lang.value)
      );
    };
    const handleMonthChange = (month) => {
      emit(
        "date-change",
        dayjs(new Date(yearValue.value, month - 1, 1)).locale(lang.value)
      );
    };
    const selectToday = () => {
      emit("date-change", "today");
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        [
          vue.createVNode(vue.unref(index$2.ElSelect), {
            "model-value": yearValue.value,
            size: "small",
            class: vue.normalizeClass(vue.unref(nsSelect).e("year")),
            "validate-event": false,
            options: yearOptions.value,
            onChange: handleYearChange
          }, null, 8, ["model-value", "class", "options"]),
          vue.createVNode(vue.unref(index$2.ElSelect), {
            "model-value": monthValue.value,
            size: "small",
            class: vue.normalizeClass(vue.unref(nsSelect).e("month")),
            "validate-event": false,
            options: vue.unref(monthOptions),
            onChange: handleMonthChange
          }, null, 8, ["model-value", "class", "options"]),
          vue.createVNode(vue.unref(index$3.ElButton), {
            size: "small",
            onClick: selectToday
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(
                vue.toDisplayString(vue.unref(t)("el.datepicker.today")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=select-controller.vue2.js.map
