'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ta = {
  name: "ta",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
      // to be translated
    },
    colorpicker: {
      confirm: "\u0B89\u0BB1\u0BC1\u0BA4\u0BBF \u0B9A\u0BC6\u0BAF\u0BCD",
      clear: "\u0BA4\u0BC6\u0BB3\u0BBF\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1",
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
      now: "\u0BA4\u0BB1\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1",
      today: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1",
      cancel: "\u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD",
      clear: "\u0B9A\u0BB0\u0BBF",
      confirm: "\u0B89\u0BB1\u0BC1\u0BA4\u0BBF \u0B9A\u0BC6\u0BAF\u0BCD",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      // to be translated
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      // to be translated
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      // to be translated
      selectedDate: "Selected date",
      // to be translated
      selectDate: "\u0BA4\u0BC7\u0BA4\u0BBF\u0BAF\u0BC8 \u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD",
      selectTime: "\u0BA8\u0BC7\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD",
      startDate: "\u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA8\u0BBE\u0BB3\u0BCD",
      startTime: "\u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
      endDate: "\u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0BA4\u0BC7\u0BA4\u0BBF",
      endTime: "\u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
      prevYear: "Previous Year",
      // to be translated
      nextYear: "Next Year",
      // to be translated
      prevMonth: "Previous Month",
      // to be translated
      nextMonth: "Next Month",
      // to be translated
      year: "\u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD",
      month1: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF",
      month2: "\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF",
      month3: "\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD",
      month4: "\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD",
      month5: "\u0BAE\u0BC7",
      month6: "\u0B9C\u0BC2\u0BA9\u0BCD",
      month7: "\u0B9C\u0BC2\u0BB2\u0BC8",
      month8: "\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD",
      month9: "\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD",
      month10: "\u0B85\u0B95\u0BCD\u0B9F\u0BCB\u0BAA\u0BB0\u0BCD",
      month11: "\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD",
      month12: "\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD",
      weeks: {
        sun: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BC1",
        mon: "\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
        tue: "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD",
        wed: "\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD",
        thu: "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD",
        fri: "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF",
        sat: "\u0B9A\u0BA9\u0BBF"
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
        jan: "\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF",
        feb: "\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF",
        mar: "\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD",
        apr: "\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD",
        may: "\u0BAE\u0BC7",
        jun: "\u0B9C\u0BC2\u0BA9\u0BCD",
        jul: "\u0B9C\u0BC2\u0BB2\u0BC8",
        aug: "\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD",
        sep: "\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD",
        oct: "\u0B85\u0B95\u0BCD\u0B9F\u0BCB\u0BAA\u0BB0\u0BCD",
        nov: "\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD",
        dec: "\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      // to be translated
      increase: "increase number"
      // to be translated
    },
    select: {
      loading: "\u0BA4\u0BAF\u0BBE\u0BB0\u0BBE\u0B95\u0BBF\u0B95\u0BCD\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1",
      noMatch: "\u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BBE\u0BA9 \u0BA4\u0BB0\u0BB5\u0BC1 \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
      noData: "\u0BA4\u0BB0\u0BB5\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
      placeholder: "\u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD"
    },
    mention: {
      loading: "\u0BA4\u0BAF\u0BBE\u0BB0\u0BBE\u0B95\u0BBF\u0B95\u0BCD\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
      // to be translated
    },
    cascader: {
      noMatch: "\u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BBE\u0BA9 \u0BA4\u0BB0\u0BB5\u0BC1 \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
      loading: "\u0BA4\u0BAF\u0BBE\u0BB0\u0BBE\u0B95\u0BBF\u0B95\u0BCD\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1",
      placeholder: "\u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD",
      noData: "\u0BA4\u0BB0\u0BB5\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8"
    },
    pagination: {
      goto: "\u0BA4\u0BC7\u0BB5\u0BC8\u0BAF\u0BBE\u0BA9\u0BCD \u0BAA\u0B95\u0BC1\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BC1 \u0B9A\u0BC6\u0BB2\u0BCD",
      pagesize: "/page",
      total: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD {total}",
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
      title: "\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BBF",
      confirm: "\u0B89\u0BB1\u0BC1\u0BA4\u0BBF \u0B9A\u0BC6\u0BAF\u0BCD",
      cancel: "\u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD",
      error: "\u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BAE\u0BBF\u0BB2\u0BCD\u0BB2\u0BBE\u0BA4 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
      close: "Close this dialog"
      // to be translated
    },
    upload: {
      deleteTip: "press delete to remove",
      // to be translated
      delete: "\u0BA8\u0BC0\u0B95\u0BCD\u0B95\u0BC1",
      preview: "\u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BCB\u0B9F\u0BCD\u0B9F\u0BAE\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD",
      continue: "\u0BA4\u0BCA\u0B9F\u0BB0\u0BC1"
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
      emptyText: "\u0BA4\u0BB0\u0BB5\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
      confirmFilter: "\u0B89\u0BB1\u0BC1\u0BA4\u0BBF \u0B9A\u0BC6\u0BAF\u0BCD",
      resetFilter: "\u0BAA\u0BC1\u0BA4\u0BC1\u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD",
      clearFilter: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD",
      sumText: "\u0B95\u0BC2\u0B9F\u0BCD\u0B9F\u0BC1",
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
      emptyText: "\u0BA4\u0BB0\u0BB5\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8"
    },
    transfer: {
      noMatch: "\u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BBE\u0BA9 \u0BA4\u0BB0\u0BB5\u0BC1 \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
      noData: "\u0BA4\u0BB0\u0BB5\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
      titles: ["\u0BAA\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BB2\u0BCD 1", "\u0BAA\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BB2\u0BCD 2"],
      filterPlaceholder: "\u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD",
      noCheckedFormat: "{total} items",
      // to be translated
      hasCheckedFormat: "{checked}/{total} \u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BB5\u0BC8\u0B95\u0BB3\u0BCD"
    },
    image: {
      error: "FAILED"
      // to be translated
    },
    pageHeader: {
      title: "Back"
      // to be translated
    },
    popconfirm: {
      confirmButtonText: "Yes",
      // to be translated
      cancelButtonText: "No"
      // to be translated
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

exports.default = ta;
//# sourceMappingURL=ta.js.map
