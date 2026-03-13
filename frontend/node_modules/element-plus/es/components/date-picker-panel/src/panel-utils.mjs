import _sfc_main from './date-picker-com/panel-date-pick.vue2.mjs';
import _sfc_main$3 from './date-picker-com/panel-date-range.vue2.mjs';
import _sfc_main$2 from './date-picker-com/panel-month-range.vue2.mjs';
import _sfc_main$1 from './date-picker-com/panel-year-range.vue2.mjs';

const getPanel = function(type) {
  switch (type) {
    case "daterange":
    case "datetimerange": {
      return _sfc_main$3;
    }
    case "monthrange": {
      return _sfc_main$2;
    }
    case "yearrange": {
      return _sfc_main$1;
    }
    default: {
      return _sfc_main;
    }
  }
};

export { getPanel };
//# sourceMappingURL=panel-utils.mjs.map
