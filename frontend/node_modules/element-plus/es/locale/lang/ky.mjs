var ky = {
  name: "ky",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
      // to be translated
    },
    colorpicker: {
      confirm: "\u041C\u0443\u0440\u0443\u043D\u043A\u0443",
      clear: "\u0430\u0447\u044B\u043A",
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
      now: "\u0430\u0437\u044B\u0440",
      today: "\u0431\u04AF\u0433\u04AF\u043D",
      cancel: "\u0436\u043E\u043A\u043A\u043E \u0447\u044B\u0433\u0430\u0440\u044B\u043B\u0434\u044B",
      clear: "\u0430\u0447\u044B\u043A",
      confirm: "\u0431\u0435\u043B\u0433\u0438\u043B\u04E9\u04E9",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      // to be translated
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      // to be translated
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      // to be translated
      selectedDate: "Selected date",
      // to be translated
      selectDate: "\u0434\u0430\u0442\u0430",
      selectTime: "\u0442\u0430\u043D\u0434\u043E\u043E \u0443\u0431\u0430\u043A\u0442\u044B\u0441\u044B",
      startDate: "\u0411\u0430\u0448\u0442\u0430\u043B\u0433\u0430\u043D \u0434\u0430\u0442\u0430\u0441\u044B",
      startTime: "Start \u0443\u0431\u0430\u043A\u044B\u0442",
      endDate: "\u0411\u04AF\u0442\u043A\u04E9\u043D \u0434\u0430\u0442\u0430\u0441\u044B",
      endTime: "End \u0443\u0431\u0430\u043A\u044B\u0442",
      prevYear: "\u04E9\u0442\u043A\u04E9\u043D \u0436\u044B\u043B\u044B",
      nextYear: "\u0431\u0438\u0440 \u0436\u044B\u043B\u0434\u0430\u043D \u043A\u0438\u0439\u0438\u043D",
      prevMonth: "\u04E8\u0442\u043A\u04E9\u043D \u0430\u0439\u0434\u0430",
      nextMonth: "\u041A\u0438\u0439\u0438\u043D\u043A\u0438 \u0430\u0439",
      year: "\u0436\u044B\u043B",
      month1: "\u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u0430\u0439",
      month2: "\u042D\u043A\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430",
      month3: "\u04AE\u0447\u04AF\u043D\u0447\u04AF \u0430\u0439\u0434\u0430",
      month4: "\u0422\u04E9\u0440\u0442\u04AF\u043D\u0447\u04AF \u0430\u0439\u0434\u0430",
      month5: "\u0431\u0435\u0448\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430",
      month6: "\u0410\u043B\u0433\u0430\u0447\u043A\u044B \u0430\u043B\u0442\u044B \u0430\u0439",
      month7: "\u0436\u0435\u0442\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430",
      month8: "\u0441\u0435\u0433\u0438\u0437\u0438\u043D\u0447\u0438 \u0430\u0439",
      month9: "\u0410\u043B\u0433\u0430\u0447\u043A\u044B \u0442\u043E\u0433\u0443\u0437 \u0430\u0439",
      month10: "\u043E\u043D\u0443\u043D\u0447\u0443 \u0430\u0439\u0434\u0430",
      month11: "\u043E\u043D \u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u0430\u0439",
      month12: "\u043E\u043D \u044D\u043A\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430",
      weeks: {
        sun: "\u0436\u0435\u0442\u0438 \u0436\u0443\u043C\u0430",
        mon: "\u0434\u04AF\u0439\u0448\u04E9\u043C\u0431\u04AF",
        tue: "\u0448\u0435\u0439\u0448\u0435\u043C\u0431\u0438",
        wed: "\u0448\u0430\u0440\u0448\u0435\u043C\u0431\u0438",
        thu: "\u0431\u0435\u0439\u0448\u0435\u043C\u0431\u0438",
        fri: "\u0436\u0443\u043C\u0430",
        sat: "\u0438\u0448\u0435\u043C\u0431\u0438"
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
        jan: "\u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u0430\u0439",
        feb: "\u042D\u043A\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430",
        mar: "\u04AE\u0447\u04AF\u043D\u0447\u04AF \u0430\u0439\u0434\u0430",
        apr: "\u0422\u04E9\u0440\u0442\u04AF\u043D\u0447\u04AF \u0430\u0439\u0434\u0430",
        may: "\u0431\u0435\u0448\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430",
        jun: "\u0410\u043B\u0433\u0430\u0447\u043A\u044B \u0430\u043B\u0442\u044B \u0430\u0439",
        jul: "\u0436\u0435\u0442\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430",
        aug: "\u0441\u0435\u0433\u0438\u0437\u0438\u043D\u0447\u0438 \u0430\u0439",
        sep: "\u0410\u043B\u0433\u0430\u0447\u043A\u044B \u0442\u043E\u0433\u0443\u0437 \u0430\u0439",
        oct: "\u043E\u043D\u0443\u043D\u0447\u0443 \u0430\u0439\u0434\u0430",
        nov: "\u043E\u043D \u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u0430\u0439",
        dec: "\u043E\u043D \u044D\u043A\u0438\u043D\u0447\u0438 \u0430\u0439\u0434\u0430"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      // to be translated
      increase: "increase number"
      // to be translated
    },
    select: {
      loading: "\u0416\u04AF\u043A\u0442\u04E9\u043B\u04AF\u04AF\u0434\u04E9",
      noMatch: "\u0414\u0430\u043B \u043A\u0435\u043B\u0433\u0435\u043D \u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442\u0442\u0430\u0440",
      noData: "\u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442 \u0436\u043E\u043A",
      placeholder: "\u0442\u0430\u043D\u0434\u043E\u043E"
    },
    mention: {
      loading: "\u0416\u04AF\u043A\u0442\u04E9\u043B\u04AF\u04AF\u0434\u04E9"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
      // to be translated
    },
    cascader: {
      noMatch: "\u0414\u0430\u043B \u043A\u0435\u043B\u0433\u0435\u043D \u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442\u0442\u0430\u0440",
      loading: "\u0416\u04AF\u043A\u0442\u04E9\u043B\u04AF\u04AF\u0434\u04E9",
      placeholder: "\u0442\u0430\u043D\u0434\u043E\u043E",
      noData: "\u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442 \u0436\u043E\u043A"
    },
    pagination: {
      goto: "\u041C\u0443\u0440\u0443\u043D\u043A\u0443",
      pagesize: "\u0431\u0438\u0440",
      total: "\u0431\u04AF\u0442\u04AF\u043D\u0434\u04E9\u0439 {total} \u0441\u0430\u043D ",
      pageClassifier: "\u0431\u0435\u0442",
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
      title: "\u0442\u0435\u0437",
      confirm: "\u0431\u0435\u043B\u0433\u0438\u043B\u04E9\u04E9",
      cancel: "\u0436\u043E\u043A\u043A\u043E \u0447\u044B\u0433\u0430\u0440\u044B\u043B\u0434\u044B",
      error: "\u041C\u0430\u0430\u043B\u044B\u043C\u0430\u0442\u0442\u0430\u0440\u0434\u044B \u043A\u0438\u0440\u0433\u0438\u0437\u04AF\u04AF \u043C\u044B\u0439\u0437\u0430\u043C\u0434\u0443\u0443 \u044D\u043C\u0435\u0441!",
      close: "Close this dialog"
      // to be translated
    },
    upload: {
      deleteTip: "\u0416\u043E\u043A \u043A\u044B\u043B\u0443\u0443 \u0431\u0430\u0441\u043A\u044B\u0447\u044B\u043D \u0431\u0430\u0441\u0443\u0443 \u0436\u043E\u043A",
      delete: "\u0436\u043E\u043A \u043A\u044B\u043B\u0443\u0443",
      preview: "\u0416\u041C\u041A\u043D\u044B\u043D \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438",
      continue: "\u0436\u04AF\u043A\u0442\u04E9\u043F \u0431\u0435\u0440"
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
      emptyText: "\u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442 \u0436\u043E\u043A",
      confirmFilter: "\u0447\u044B\u043F\u043A\u0430",
      resetFilter: "\u043A\u0430\u0439\u0440\u0430 \u043E\u0440\u043D\u043E\u0442\u0443\u0443",
      clearFilter: "\u0431\u04AF\u0442\u043A\u04E9\u043D",
      sumText: "\u0411\u0430\u0440\u0434\u044B\u0433\u044B \u0431\u043E\u043B\u0443\u043F",
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
      emptyText: "\u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442 \u0436\u043E\u043A"
    },
    transfer: {
      noMatch: "\u0414\u0430\u043B \u043A\u0435\u043B\u0433\u0435\u043D \u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442\u0442\u0430\u0440",
      noData: "\u043C\u0430\u0430\u043B\u044B\u043C\u0430\u0442 \u0436\u043E\u043A",
      titles: ["1 \u0442\u0438\u0437\u043C\u0435\u0441\u0438", "2 \u0442\u0438\u0437\u043C\u0435\u0441\u0438"],
      filterPlaceholder: "\u0421\u0443\u0440\u0430\u043D\u044B\u0447, \u0438\u0437\u0434\u04E9\u04E9 \u043A\u0438\u0440\u0435\u0442",
      noCheckedFormat: "\u0431\u04AF\u0442\u04AF\u043D\u0434\u04E9\u0439 {total} \u0441\u0430\u043D",
      hasCheckedFormat: "\u0422\u0430\u043D\u0434\u0430\u043B\u0433\u0430\u043D {checked}/{total} \u0441\u0430\u043D"
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

export { ky as default };
//# sourceMappingURL=ky.mjs.map
