'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fi = {
  name: "fi",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
      // to be translated
    },
    colorpicker: {
      confirm: "OK",
      clear: "Tyhjenn\xE4",
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
      now: "Nyt",
      today: "T\xE4n\xE4\xE4n",
      cancel: "Peruuta",
      clear: "Tyhjenn\xE4",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      // to be translated
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      // to be translated
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      // to be translated
      selectedDate: "Selected date",
      // to be translated
      selectDate: "Valitse p\xE4iv\xE4",
      selectTime: "Valitse aika",
      startDate: "Aloitusp\xE4iv\xE4",
      startTime: "Aloitusaika",
      endDate: "Lopetusp\xE4iv\xE4",
      endTime: "Lopetusaika",
      prevYear: "Edellinen vuosi",
      nextYear: "Seuraava vuosi",
      prevMonth: "Edellinen kuukausi",
      nextMonth: "Seuraava kuukausi",
      year: "",
      month1: "tammikuu",
      month2: "helmikuu",
      month3: "maaliskuu",
      month4: "huhtikuu",
      month5: "toukokuu",
      month6: "kes\xE4kuu",
      month7: "hein\xE4kuu",
      month8: "elokuu",
      month9: "syyskuu",
      month10: "lokakuu",
      month11: "marraskuu",
      month12: "joulukuu",
      weeks: {
        sun: "su",
        mon: "ma",
        tue: "ti",
        wed: "ke",
        thu: "to",
        fri: "pe",
        sat: "la"
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
        jan: "tammi",
        feb: "helmi",
        mar: "maalis",
        apr: "huhti",
        may: "touko",
        jun: "kes\xE4",
        jul: "hein\xE4",
        aug: "elo",
        sep: "syys",
        oct: "loka",
        nov: "marras",
        dec: "joulu"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      // to be translated
      increase: "increase number"
      // to be translated
    },
    select: {
      loading: "Lataa",
      noMatch: "Ei vastaavia tietoja",
      noData: "Ei tietoja",
      placeholder: "Valitse"
    },
    mention: {
      loading: "Lataa"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
      // to be translated
    },
    cascader: {
      noMatch: "Ei vastaavia tietoja",
      loading: "Lataa",
      placeholder: "Valitse",
      noData: "Ei tietoja"
    },
    pagination: {
      goto: "Mene",
      pagesize: "/sivu",
      total: "Yhteens\xE4 {total}",
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
      title: "Viesti",
      confirm: "OK",
      cancel: "Peruuta",
      error: "Virheellinen sy\xF6te",
      close: "Close this dialog"
      // to be translated
    },
    upload: {
      deleteTip: "Poista Delete-n\xE4pp\xE4imell\xE4",
      delete: "Poista",
      preview: "Esikatsele",
      continue: "Jatka"
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
      emptyText: "Ei tietoja",
      confirmFilter: "Vahvista",
      resetFilter: "Tyhjenn\xE4",
      clearFilter: "Kaikki",
      sumText: "Summa",
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
      emptyText: "Ei tietoja"
    },
    transfer: {
      noMatch: "Ei vastaavia tietoja",
      noData: "Ei tietoja",
      titles: ["Luettelo 1", "Luettelo 2"],
      filterPlaceholder: "Sy\xF6t\xE4 hakusana",
      noCheckedFormat: "{total} kohdetta",
      hasCheckedFormat: "{checked}/{total} valittu"
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

exports.default = fi;
//# sourceMappingURL=fi.js.map
