'use strict';

var vue = require('vue');
var core = require('@vueuse/core');
var style = require('../../../../utils/dom/style.js');

function useResizable(props, target, emit) {
  const { width, height } = core.useWindowSize();
  const isHorizontal = vue.computed(() => ["ltr", "rtl"].includes(props.direction));
  const sign = vue.computed(
    () => ["ltr", "ttb"].includes(props.direction) ? 1 : -1
  );
  const windowSize = vue.computed(
    () => isHorizontal.value ? width.value : height.value
  );
  const getSize = vue.computed(() => {
    return core.clamp(
      startSize.value + sign.value * offset.value,
      4,
      windowSize.value
    );
  });
  const startSize = vue.ref(0);
  const offset = vue.ref(0);
  const isResizing = vue.ref(false);
  const hasStartedDragging = vue.ref(false);
  let startPos = [];
  let cleanups = [];
  const getActualSize = () => {
    var _a;
    const drawerEl = (_a = target.value) == null ? void 0 : _a.closest('[aria-modal="true"]');
    if (drawerEl) {
      return isHorizontal.value ? drawerEl.offsetWidth : drawerEl.offsetHeight;
    }
    return 100;
  };
  vue.watch(
    () => [props.size, props.resizable],
    () => {
      hasStartedDragging.value = false;
      startSize.value = 0;
      offset.value = 0;
      onMouseUp();
    }
  );
  const onMousedown = (e) => {
    if (!props.resizable) return;
    if (!hasStartedDragging.value) {
      startSize.value = getActualSize();
      hasStartedDragging.value = true;
    }
    startPos = [e.pageX, e.pageY];
    isResizing.value = true;
    emit("resize-start", e, startSize.value);
    cleanups.push(
      core.useEventListener(window, "mouseup", onMouseUp),
      core.useEventListener(window, "mousemove", onMouseMove)
    );
  };
  const onMouseMove = (e) => {
    const { pageX, pageY } = e;
    const offsetX = pageX - startPos[0];
    const offsetY = pageY - startPos[1];
    offset.value = isHorizontal.value ? offsetX : offsetY;
    emit("resize", e, getSize.value);
  };
  const onMouseUp = (e) => {
    if (!isResizing.value) return;
    startPos = [];
    startSize.value = getSize.value;
    offset.value = 0;
    isResizing.value = false;
    cleanups.forEach((cleanup2) => cleanup2 == null ? void 0 : cleanup2());
    cleanups = [];
    if (e) {
      emit("resize-end", e, startSize.value);
    }
  };
  const cleanup = core.useEventListener(target, "mousedown", onMousedown);
  vue.onBeforeUnmount(() => {
    cleanup();
    onMouseUp();
  });
  return {
    size: vue.computed(() => {
      return hasStartedDragging.value ? `${getSize.value}px` : style.addUnit(props.size);
    }),
    isResizing,
    isHorizontal
  };
}

exports.useResizable = useResizable;
//# sourceMappingURL=useResizable.js.map
