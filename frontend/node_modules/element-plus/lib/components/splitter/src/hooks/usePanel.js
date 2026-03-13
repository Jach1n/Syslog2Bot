'use strict';

var shared = require('@vue/shared');

function getCollapsible(collapsible) {
  if (collapsible && shared.isObject(collapsible)) {
    return collapsible;
  }
  return {
    start: !!collapsible,
    end: !!collapsible
  };
}
function isCollapsible(panel, size, nextPanel, nextSize) {
  if ((panel == null ? void 0 : panel.collapsible.end) && size > 0) {
    return true;
  }
  if ((nextPanel == null ? void 0 : nextPanel.collapsible.start) && nextSize === 0 && size > 0) {
    return true;
  }
  return false;
}

exports.getCollapsible = getCollapsible;
exports.isCollapsible = isCollapsible;
//# sourceMappingURL=usePanel.js.map
