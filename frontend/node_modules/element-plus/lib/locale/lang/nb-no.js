'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nbNo = {
  name: "nb-no",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
      // to be translated
    },
    colorpicker: {
      confirm: "OK",
      clear: "T\xF8m",
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
      now: "N\xE5",
      today: "I dag",
      cancel: "Avbryt",
      clear: "T\xF8m",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      // to be translated
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      // to be translated
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      // to be translated
      selectedDate: "Selected date",
      // to be translated
      selectDate: "Velg dato",
      selectTime: "Velg tidspunkt",
      startDate: "Startdato",
      startTime: "Starttidspunkt",
      endDate: "Sluttdato",
      endTime: "Sluttidspunkt",
      prevYear: "I fjor",
      nextYear: "Neste \xE5r",
      prevMonth: "Forrige M\xE5ned",
      nextMonth: "Neste M\xE5ned",
      year: "",
      month1: "Januar",
      month2: "Februar",
      month3: "Mars",
      month4: "April",
      month5: "Mai",
      month6: "Juni",
      month7: "Juli",
      month8: "August",
      month9: "September",
      month10: "Oktober",
      month11: "November",
      month12: "Desember",
      weeks: {
        sun: "S\xF8n",
        mon: "Man",
        tue: "Tir",
        wed: "Ons",
        thu: "Tor",
        fri: "Fre",
        sat: "L\xF8r"
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
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "Mai",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Okt",
        nov: "Nov",
        dec: "Des"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      // to be translated
      increase: "increase number"
      // to be translated
    },
    select: {
      loading: "Laster",
      noMatch: "Ingen samsvarende resulater",
      noData: "Ingen resulater",
      placeholder: "Velg"
    },
    mention: {
      loading: "Laster"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
      // to be translated
    },
    cascader: {
      noMatch: "Ingen samsvarende resultater",
      loading: "Laster",
      placeholder: "Velg",
      noData: "Ingen resultater"
    },
    pagination: {
      goto: "G\xE5 til",
      pagesize: "/side",
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
      title: "Message",
      // to be translated
      confirm: "OK",
      cancel: "Avbryt",
      error: "Ugyldig input",
      close: "Close this dialog"
      // to be translated
    },
    upload: {
      deleteTip: "trykk p\xE5 x for \xE5 slette",
      delete: "Slett",
      preview: "Forh\xE5ndsvisning",
      continue: "Fortsett"
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
      emptyText: "Ingen Data",
      confirmFilter: "Bekreft",
      resetFilter: "Tilbakestill",
      clearFilter: "Alle",
      sumText: "Sum",
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
      emptyText: "Ingen Data"
    },
    transfer: {
      noMatch: "Ingen samsvarende data",
      noData: "Ingen data",
      titles: ["Liste 1", "Liste 2"],
      filterPlaceholder: "Skriv inn n\xF8kkelord",
      noCheckedFormat: "{total} gjenstander",
      hasCheckedFormat: "{checked}/{total} valgt"
    },
    image: {
      error: "FEILET"
    },
    pageHeader: {
      title: "Tilbake"
    },
    popconfirm: {
      confirmButtonText: "Ja",
      cancelButtonText: "Nei"
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

exports.default = nbNo;
//# sourceMappingURL=nb-no.js.map
