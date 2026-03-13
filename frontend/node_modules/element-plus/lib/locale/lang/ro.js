'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ro = {
  name: "ro",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
      // to be translated
    },
    colorpicker: {
      confirm: "OK",
      clear: "\u0218terge",
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
      now: "Acum",
      today: "Azi",
      cancel: "Anuleaz\u0103",
      clear: "\u0218terge",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      // to be translated
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      // to be translated
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      // to be translated
      selectedDate: "Selected date",
      // to be translated
      selectDate: "Selecteaz\u0103 data",
      selectTime: "Selecteaz\u0103 ora",
      startDate: "Data de \xEEnceput",
      startTime: "Ora de \xEEnceput",
      endDate: "Data de sf\xE2r\u0219it",
      endTime: "Ora de sf\xE2r\u0219it",
      prevYear: "Anul trecut",
      nextYear: "Anul urm\u0103tor",
      prevMonth: "Luna trecut\u0103",
      nextMonth: "Luna urm\u0103toare",
      year: "",
      month1: "Ianuarie",
      month2: "Februarie",
      month3: "Martie",
      month4: "Aprilie",
      month5: "Mai",
      month6: "Iunie",
      month7: "Iulie",
      month8: "August",
      month9: "Septembrie",
      month10: "Octombrie",
      month11: "Noiembrie",
      month12: "Decembrie",
      weeks: {
        sun: "Du",
        mon: "Lu",
        tue: "Ma",
        wed: "Mi",
        thu: "Jo",
        fri: "Vi",
        sat: "S\xE2"
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
        jan: "Ian",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "Mai",
        jun: "Iun",
        jul: "Iul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Noi",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      // to be translated
      increase: "increase number"
      // to be translated
    },
    select: {
      loading: "Se \xEEncarc\u0103",
      noMatch: "Nu exist\u0103 date potrivite",
      noData: "Nu exist\u0103 date",
      placeholder: "Selecteaz\u0103"
    },
    mention: {
      loading: "Se \xEEncarc\u0103"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
      // to be translated
    },
    cascader: {
      noMatch: "Nu exist\u0103 date potrivite",
      loading: "Se \xEEncarc\u0103",
      placeholder: "Selecteaz\u0103",
      noData: "Nu exist\u0103 date"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/pagina",
      total: "Total {total}",
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
      title: "Mesaj",
      confirm: "OK",
      cancel: "Anuleaz\u0103",
      error: "Date introduse eronate",
      close: "Close this dialog"
      // to be translated
    },
    upload: {
      deleteTip: "ap\u0103sa\u021Bi pe \u0219terge\u021Bi pentru a elimina",
      delete: "\u0219terge",
      preview: "previzualizare",
      continue: "continu\u0103"
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
      emptyText: "Nu exist\u0103 date",
      confirmFilter: "Confirm\u0103",
      resetFilter: "Reseteaz\u0103",
      clearFilter: "Tot",
      sumText: "Suma",
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
      emptyText: "Nu exist\u0103 date"
    },
    transfer: {
      noMatch: "Nu exist\u0103 date potrivite",
      noData: "Nu exist\u0103 date",
      titles: ["Lista 1", "Lista 2"],
      filterPlaceholder: "Introduce\u021Bi cuv\xE2ntul cheie",
      noCheckedFormat: "{total} elemente",
      hasCheckedFormat: "{checked}/{total} verificate"
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

exports.default = ro;
//# sourceMappingURL=ro.js.map
