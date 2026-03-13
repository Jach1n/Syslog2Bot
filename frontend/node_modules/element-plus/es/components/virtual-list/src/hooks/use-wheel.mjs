import { HORIZONTAL } from '../defaults.mjs';
import { cAF, rAF } from '../../../../utils/raf.mjs';
import { isFirefox } from '../../../../utils/browser.mjs';

const useWheel = ({ atEndEdge, atStartEdge, layout }, onWheelDelta) => {
  let frameHandle;
  let offset = 0;
  const hasReachedEdge = (offset2) => {
    const edgeReached = offset2 < 0 && atStartEdge.value || offset2 > 0 && atEndEdge.value;
    return edgeReached;
  };
  const onWheel = (e) => {
    cAF(frameHandle);
    let { deltaX, deltaY } = e;
    if (e.shiftKey && deltaY !== 0) {
      deltaX = deltaY;
      deltaY = 0;
    }
    const newOffset = layout.value === HORIZONTAL ? deltaX : deltaY;
    if (hasReachedEdge(newOffset)) return;
    offset += newOffset;
    if (!isFirefox() && newOffset !== 0) {
      e.preventDefault();
    }
    frameHandle = rAF(() => {
      onWheelDelta(offset);
      offset = 0;
    });
  };
  return {
    hasReachedEdge,
    onWheel
  };
};

export { useWheel as default };
//# sourceMappingURL=use-wheel.mjs.map
