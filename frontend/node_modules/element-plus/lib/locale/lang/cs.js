'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cs = {
  name: "cs",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
      // to be translated
    },
    colorpicker: {
      confirm: "OK",
      clear: "Vymazat",
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
      now: "Te\u010F",
      today: "Dnes",
      cancel: "Zru\u0161it",
      clear: "Vymazat",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      // to be translated
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      // to be translated
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      // to be translated
      selectedDate: "Selected date",
      // to be translated
      selectDate: "Vybrat datum",
      selectTime: "Vybrat \u010Das",
      startDate: "Datum za\u010D\xE1tku",
      startTime: "\u010Cas za\u010D\xE1tku",
      endDate: "Datum konce",
      endTime: "\u010Cas konce",
      prevYear: "P\u0159edchoz\xED rok",
      nextYear: "P\u0159\xED\u0161t\xED rok",
      prevMonth: "P\u0159edchoz\xED m\u011Bs\xEDc",
      nextMonth: "P\u0159\xED\u0161t\xED m\u011Bs\xEDc",
      year: "Rok",
      month1: "Leden",
      month2: "\xDAnor",
      month3: "B\u0159ezen",
      month4: "Duben",
      month5: "Kv\u011Bten",
      month6: "\u010Cerven",
      month7: "\u010Cervenec",
      month8: "Srpen",
      month9: "Z\xE1\u0159\xED",
      month10: "\u0158\xEDjen",
      month11: "Listopad",
      month12: "Prosinec",
      weeks: {
        sun: "Ne",
        mon: "Po",
        tue: "\xDAt",
        wed: "St",
        thu: "\u010Ct",
        fri: "P\xE1",
        sat: "So"
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
        jan: "Led",
        feb: "\xDAno",
        mar: "B\u0159e",
        apr: "Dub",
        may: "Kv\u011B",
        jun: "\u010Cer",
        jul: "\u010Cvc",
        aug: "Srp",
        sep: "Z\xE1\u0159",
        oct: "\u0158\xEDj",
        nov: "Lis",
        dec: "Pro"
      },
      day: "Den",
      month: "M\u011Bs\xEDc"
    },
    inputNumber: {
      decrease: "decrease number",
      // to be translated
      increase: "increase number"
      // to be translated
    },
    select: {
      loading: "Na\u010D\xEDt\xE1n\xED",
      noMatch: "\u017D\xE1dn\xE1 shoda",
      noData: "\u017D\xE1dn\xE1 data",
      placeholder: "Vybrat"
    },
    mention: {
      loading: "Na\u010D\xEDt\xE1n\xED"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
      // to be translated
    },
    cascader: {
      noMatch: "\u017D\xE1dn\xE1 shoda",
      loading: "Na\u010D\xEDt\xE1n\xED",
      placeholder: "Vybrat",
      noData: "\u017D\xE1dn\xE1 data"
    },
    pagination: {
      goto: "J\xEDt na",
      pagesize: "na stranu",
      total: "Celkem {total}",
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
      title: "Zpr\xE1va",
      confirm: "OK",
      cancel: "Zru\u0161it",
      error: "Neplatn\xFD vstup",
      close: "Close this dialog"
      // to be translated
    },
    upload: {
      deleteTip: "Stisknout pro smaz\xE1n\xED",
      delete: "Vymazat",
      preview: "N\xE1hled",
      continue: "Pokra\u010Dovat"
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
      emptyText: "\u017D\xE1dn\xE1 data",
      confirmFilter: "Potvrdit",
      resetFilter: "Resetovat",
      clearFilter: "V\u0161e",
      sumText: "Celkem",
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
      emptyText: "\u017D\xE1dn\xE1 data"
    },
    transfer: {
      noMatch: "\u017D\xE1dn\xE1 shoda",
      noData: "\u017D\xE1dn\xE1 data",
      titles: ["Seznam 1", "Seznam 2"],
      filterPlaceholder: "Kl\xED\u010Dov\xE9 slovo",
      noCheckedFormat: "{total} polo\u017Eek",
      hasCheckedFormat: "{checked}/{total} vybr\xE1no"
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

exports.default = cs;
//# sourceMappingURL=cs.js.map
