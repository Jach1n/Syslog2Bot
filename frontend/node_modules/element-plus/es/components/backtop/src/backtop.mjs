const backtopProps = {
  /**
   * @description the button will not show until the scroll height reaches this value.
   */
  visibilityHeight: {
    type: Number,
    default: 200
  },
  /**
   * @description the target to trigger scroll.
   */
  target: {
    type: String,
    default: ""
  },
  /**
   * @description right distance.
   */
  right: {
    type: Number,
    default: 40
  },
  /**
   * @description bottom distance.
   */
  bottom: {
    type: Number,
    default: 40
  }
};
const backtopEmits = {
  click: (evt) => evt instanceof MouseEvent
};

export { backtopEmits, backtopProps };
//# sourceMappingURL=backtop.mjs.map
