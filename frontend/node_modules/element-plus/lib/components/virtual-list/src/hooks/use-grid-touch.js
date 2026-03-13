'use strict';

var vue = require('vue');
var core = require('@vueuse/core');
var raf = require('../../../../utils/raf.js');

const useGridTouch = (windowRef, states, scrollTo, estimatedTotalWidth, estimatedTotalHeight, parsedWidth, parsedHeight) => {
  const touchStartX = vue.ref(0);
  const touchStartY = vue.ref(0);
  let frameHandle;
  let deltaX = 0;
  let deltaY = 0;
  const handleTouchStart = (event) => {
    raf.cAF(frameHandle);
    touchStartX.value = event.touches[0].clientX;
    touchStartY.value = event.touches[0].clientY;
    deltaX = 0;
    deltaY = 0;
  };
  const handleTouchMove = (event) => {
    event.preventDefault();
    raf.cAF(frameHandle);
    deltaX += touchStartX.value - event.touches[0].clientX;
    deltaY += touchStartY.value - event.touches[0].clientY;
    touchStartX.value = event.touches[0].clientX;
    touchStartY.value = event.touches[0].clientY;
    frameHandle = raf.rAF(() => {
      const maxScrollLeft = estimatedTotalWidth.value - vue.unref(parsedWidth);
      const maxScrollTop = estimatedTotalHeight.value - vue.unref(parsedHeight);
      const safeScrollLeft = Math.min(
        states.value.scrollLeft + deltaX,
        maxScrollLeft
      );
      const safeScrollTop = Math.min(
        states.value.scrollTop + deltaY,
        maxScrollTop
      );
      scrollTo({
        scrollLeft: safeScrollLeft,
        scrollTop: safeScrollTop
      });
      deltaX = 0;
      deltaY = 0;
    });
  };
  core.useEventListener(windowRef, "touchstart", handleTouchStart, {
    passive: true
  });
  core.useEventListener(windowRef, "touchmove", handleTouchMove, {
    passive: false
  });
  return {
    touchStartX,
    touchStartY,
    handleTouchStart,
    handleTouchMove
  };
};

exports.useGridTouch = useGridTouch;
//# sourceMappingURL=use-grid-touch.js.map
