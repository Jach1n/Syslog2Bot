'use strict';

var size = require('../../constants/size.js');

const getComponentSize = (size$1) => {
  return size.componentSizeMap[size$1 || "default"];
};

exports.getComponentSize = getComponentSize;
//# sourceMappingURL=size.js.map
