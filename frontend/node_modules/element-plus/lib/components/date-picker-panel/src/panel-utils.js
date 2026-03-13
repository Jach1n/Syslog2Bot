'use strict';

var panelDatePick_vue_vue_type_script_setup_true_lang = require('./date-picker-com/panel-date-pick.vue2.js');
var panelDateRange_vue_vue_type_script_setup_true_lang = require('./date-picker-com/panel-date-range.vue2.js');
var panelMonthRange_vue_vue_type_script_setup_true_lang = require('./date-picker-com/panel-month-range.vue2.js');
var panelYearRange_vue_vue_type_script_setup_true_lang = require('./date-picker-com/panel-year-range.vue2.js');

const getPanel = function(type) {
  switch (type) {
    case "daterange":
    case "datetimerange": {
      return panelDateRange_vue_vue_type_script_setup_true_lang.default;
    }
    case "monthrange": {
      return panelMonthRange_vue_vue_type_script_setup_true_lang.default;
    }
    case "yearrange": {
      return panelYearRange_vue_vue_type_script_setup_true_lang.default;
    }
    default: {
      return panelDatePick_vue_vue_type_script_setup_true_lang.default;
    }
  }
};

exports.getPanel = getPanel;
//# sourceMappingURL=panel-utils.js.map
