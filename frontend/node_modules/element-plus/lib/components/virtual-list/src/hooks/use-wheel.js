'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var defaults = require('../defaults.js');
var raf = require('../../../../utils/raf.js');
var browser = require('../../../../utils/browser.js');

const useWheel = ({ atEndEdge, atStartEdge, layout }, onWheelDelta) => {
  let frameHandle;
  let offset = 0;
  const hasReachedEdge = (offset2) => {
    const edgeReached = offset2 < 0 && atStartEdge.value || offset2 > 0 && atEndEdge.value;
    return edgeReached;
  };
  const onWheel = (e) => {
    raf.cAF(frameHandle);
    let { deltaX, deltaY } = e;
    if (e.shiftKey && deltaY !== 0) {
      deltaX = deltaY;
      deltaY = 0;
    }
    const newOffset = layout.value === defaults.HORIZONTAL ? deltaX : deltaY;
    if (hasReachedEdge(newOffset)) return;
    offset += newOffset;
    if (!browser.isFirefox() && newOffset !== 0) {
      e.preventDefault();
    }
    frameHandle = raf.rAF(() => {
      onWheelDelta(offset);
      offset = 0;
    });
  };
  return {
    hasReachedEdge,
    onWheel
  };
};

exports.default = useWheel;
//# sourceMappingURL=use-wheel.js.map
