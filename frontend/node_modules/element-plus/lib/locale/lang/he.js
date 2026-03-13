'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var he = {
  name: "he",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
      // to be translated
    },
    colorpicker: {
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      clear: "\u05E0\u05E7\u05D4",
      defaultLabel: "color picker",
      // to be translated
      description: "current color is {color}. press enter to select a new color.",
      // to be translated
      alphaLabel: "pick alpha value",
      // to be translated
      alphaDescription: "alpha {alpha}, current color is {color}",
      // to be translated
      hueLabel: "pick hue value",
      // to be translated
      hueDescription: "hue {hue}, current color is {color}",
      // to be translated
      svLabel: "pick saturation and brightness value",
      // to be translated
      svDescription: "saturation {saturation}, brightness {brightness}, current color is {color}",
      // to be translated
      predefineDescription: "select {value} as the color"
      // to be translated
    },
    datepicker: {
      now: "\u05DB\u05E2\u05EA",
      today: "\u05D4\u05D9\u05D5\u05DD",
      cancel: "\u05D1\u05D8\u05DC",
      clear: "\u05E0\u05E7\u05D4",
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      // to be translated
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      // to be translated
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      // to be translated
      selectedDate: "Selected date",
      // to be translated
      selectDate: "\u05D1\u05D7\u05E8 \u05EA\u05D0\u05E8\u05D9\u05DA",
      selectTime: "\u05D1\u05D7\u05E8 \u05D6\u05DE\u05DF",
      startDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4",
      startTime: "\u05D6\u05DE\u05DF \u05D4\u05EA\u05D7\u05DC\u05D4",
      endDate: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD",
      endTime: "\u05D6\u05DE\u05DF \u05E1\u05D9\u05D5\u05DD",
      prevYear: "\u05E9\u05E0\u05D4 \u05E7\u05D5\u05D3\u05DE\u05EA",
      nextYear: "\u05E9\u05E0\u05D4 \u05D4\u05D1\u05D0\u05D4",
      prevMonth: "\u05D7\u05D5\u05D3\u05E9 \u05E7\u05D5\u05D3\u05DD",
      nextMonth: "\u05D7\u05D5\u05D3\u05E9 \u05D4\u05D1\u05D0",
      year: "\u05E9\u05E0\u05D4",
      month1: "\u05D9\u05E0\u05D5\u05D0\u05E8",
      month2: "\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8",
      month3: "\u05DE\u05E8\u05E5",
      month4: "\u05D0\u05E4\u05E8\u05D9\u05DC",
      month5: "\u05DE\u05D0\u05D9",
      month6: "\u05D9\u05D5\u05E0\u05D9",
      month7: "\u05D9\u05D5\u05DC\u05D9",
      month8: "\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8",
      month9: "\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8",
      month10: "\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8",
      month11: "\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8",
      month12: "\u05D3\u05E6\u05DE\u05D1\u05E8",
      weeks: {
        sun: "\u05D0\u05F3",
        mon: "\u05D1\u05F3",
        tue: "\u05D2\u05F3",
        wed: "\u05D3\u05F3",
        thu: "\u05D4\u05F3",
        fri: "\u05D5\u05F3",
        sat: "\u05E9\u05D1\u05EA"
      },
      weeksFull: {
        sun: "Sunday",
        // to be translated
        mon: "Monday",
        // to be translated
        tue: "Tuesday",
        // to be translated
        wed: "Wednesday",
        // to be translated
        thu: "Thursday",
        // to be translated
        fri: "Friday",
        // to be translated
        sat: "Saturday"
        // to be translated
      },
      months: {
        jan: "\u05D9\u05E0\u05D5\u05D0\u05E8",
        feb: "\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8",
        mar: "\u05DE\u05E8\u05E5",
        apr: "\u05D0\u05E4\u05E8\u05D9\u05DC",
        may: "\u05DE\u05D0\u05D9",
        jun: "\u05D9\u05D5\u05E0\u05D9",
        jul: "\u05D9\u05D5\u05DC\u05D9",
        aug: "\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8",
        sep: "\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8",
        oct: "\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8",
        nov: "\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8",
        dec: "\u05D3\u05E6\u05DE\u05D1\u05E8"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      // to be translated
      increase: "increase number"
      // to be translated
    },
    select: {
      loading: "\u05D8\u05D5\u05E2\u05DF",
      noMatch: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      placeholder: "\u05E9\u05D5\u05DE\u05E8 \u05DE\u05E7\u05D5\u05DD"
    },
    mention: {
      loading: "\u05D8\u05D5\u05E2\u05DF"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
      // to be translated
    },
    cascader: {
      noMatch: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4",
      loading: "\u05D8\u05D5\u05E2\u05DF",
      placeholder: "\u05E9\u05D5\u05DE\u05E8 \u05DE\u05E7\u05D5\u05DD",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD"
    },
    pagination: {
      goto: "\u05E2\u05D1\u05D5\u05E8 \u05DC",
      pagesize: "/\u05E2\u05DE\u05D5\u05D3",
      total: "\u05DB\u05D5\u05DC\u05DC {total}",
      pageClassifier: "",
      page: "Page",
      // to be translated
      prev: "Go to previous page",
      // to be translated
      next: "Go to next page",
      // to be translated
      currentPage: "page {pager}",
      // to be translated
      prevPages: "Previous {pager} pages",
      // to be translated
      nextPages: "Next {pager} pages",
      // to be translated
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
      // to be translated
    },
    dialog: {
      close: "Close this dialog"
      // to be translated
    },
    drawer: {
      close: "Close this dialog"
      // to be translated
    },
    messagebox: {
      title: "\u05D4\u05D5\u05D3\u05E2\u05D4",
      confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      cancel: "\u05D1\u05D8\u05DC",
      error: "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF",
      close: "Close this dialog"
      // to be translated
    },
    upload: {
      deleteTip: "\u05DC\u05D7\u05E5 \u05DB\u05D3\u05D9 \u05DC\u05DE\u05D7\u05D5\u05E7",
      delete: "\u05DE\u05D7\u05E7",
      preview: "\u05EA\u05E6\u05D5\u05D2\u05D4 \u05DE\u05E7\u05D3\u05D9\u05DE\u05D4",
      continue: "\u05D4\u05DE\u05E9\u05DA"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      // to be translated
      defaultRangeStartLabel: "pick start value",
      // to be translated
      defaultRangeEndLabel: "pick end value"
      // to be translated
    },
    table: {
      emptyText: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      confirmFilter: "\u05D0\u05D9\u05E9\u05D5\u05E8",
      resetFilter: "\u05E0\u05E7\u05D4",
      clearFilter: "\u05D4\u05DB\u05DC",
      sumText: "\u05E1\u05DA \u05D4\u05DB\u05DC",
      selectAllLabel: "Select all rows",
      // to be translated
      selectRowLabel: "Select this row",
      // to be translated
      expandRowLabel: "Expand this row",
      // to be translated
      collapseRowLabel: "Collapse this row",
      // to be translated
      sortLabel: "Sort by {column}",
      // to be translated
      filterLabel: "Filter by {column}"
      // to be translated
    },
    tag: {
      close: "Close this tag"
      // to be translated
    },
    tour: {
      next: "Next",
      // to be translated
      previous: "Previous",
      // to be translated
      finish: "Finish",
      // to be translated
      close: "Close this dialog"
      // to be translated
    },
    tree: {
      emptyText: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD"
    },
    transfer: {
      noMatch: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      titles: ["\u05E8\u05E9\u05D9\u05DE\u05D4 1", "\u05E8\u05E9\u05D9\u05DE\u05D4 2"],
      filterPlaceholder: "\u05E1\u05E0\u05DF \u05DC\u05E4\u05D9...",
      noCheckedFormat: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD {total}",
      hasCheckedFormat: " \u05E0\u05D1\u05D7\u05E8\u05D5 {checked}/{total}"
    },
    image: {
      error: "\u05E9\u05D2\u05D9\u05D0\u05D4"
    },
    pageHeader: {
      title: "\u05D7\u05D6\u05E8\u05D4"
    },
    popconfirm: {
      confirmButtonText: "\u05DB\u05DF",
      cancelButtonText: "\u05DC\u05D0"
    },
    carousel: {
      leftArrow: "Carousel arrow left",
      // to be translated
      rightArrow: "Carousel arrow right",
      // to be translated
      indicator: "Carousel switch to index {index}"
      // to be translated
    }
  }
};

exports.default = he;
//# sourceMappingURL=he.js.map
