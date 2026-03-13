const calcColumnStyle = (column, fixedColumn, fixed) => {
  var _a, _b, _c;
  const flex = {
    flexGrow: 0,
    flexShrink: 0,
    ...fixed ? {} : {
      flexGrow: (_a = column.flexGrow) != null ? _a : 0,
      flexShrink: (_b = column.flexShrink) != null ? _b : 1
    }
  };
  const style = {
    ...(_c = column.style) != null ? _c : {},
    ...flex,
    flexBasis: "auto",
    width: column.width
  };
  if (!fixedColumn) {
    if (column.maxWidth) style.maxWidth = column.maxWidth;
    if (column.minWidth) style.minWidth = column.minWidth;
  }
  return style;
};

export { calcColumnStyle };
//# sourceMappingURL=utils.mjs.map
