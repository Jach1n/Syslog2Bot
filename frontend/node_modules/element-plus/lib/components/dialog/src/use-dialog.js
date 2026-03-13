'use strict';

var vue = require('vue');
var core = require('@vueuse/core');
var constants = require('./constants.js');
var index$3 = require('../../../hooks/use-lockscreen/index.js');
var index = require('../../../hooks/use-z-index/index.js');
var index$1 = require('../../../hooks/use-id/index.js');
var useGlobalConfig = require('../../config-provider/src/hooks/use-global-config.js');
var index$2 = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/dom/style.js');
var shared = require('@vue/shared');
var error = require('../../../utils/error.js');
var event = require('../../../constants/event.js');

const COMPONENT_NAME = "ElDialog";
const useDialog = (props, targetRef) => {
  var _a;
  const instance = vue.getCurrentInstance();
  const emit = instance.emit;
  const { nextZIndex } = index.useZIndex();
  let lastPosition = "";
  const titleId = index$1.useId();
  const bodyId = index$1.useId();
  const visible = vue.ref(false);
  const closed = vue.ref(false);
  const rendered = vue.ref(false);
  const zIndex = vue.ref((_a = props.zIndex) != null ? _a : nextZIndex());
  const closing = vue.ref(false);
  let openTimer = void 0;
  let closeTimer = void 0;
  const config = useGlobalConfig.useGlobalConfig();
  const namespace = vue.computed(() => {
    var _a2, _b;
    return (_b = (_a2 = config.value) == null ? void 0 : _a2.namespace) != null ? _b : index$2.defaultNamespace;
  });
  const globalConfig = vue.computed(() => {
    var _a2;
    return (_a2 = config.value) == null ? void 0 : _a2.dialog;
  });
  const style$1 = vue.computed(() => {
    const style2 = {};
    const varPrefix = `--${namespace.value}-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style2[`${varPrefix}-margin-top`] = props.top;
      }
      const width = style.addUnit(props.width);
      if (width) {
        style2[`${varPrefix}-width`] = width;
      }
    }
    return style2;
  });
  const _draggable = vue.computed(
    () => {
      var _a2, _b, _c;
      return ((_c = (_b = props.draggable) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.draggable) != null ? _c : false) && !props.fullscreen;
    }
  );
  const _alignCenter = vue.computed(
    () => {
      var _a2, _b, _c;
      return (_c = (_b = props.alignCenter) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.alignCenter) != null ? _c : false;
    }
  );
  const _overflow = vue.computed(
    () => {
      var _a2, _b, _c;
      return (_c = (_b = props.overflow) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.overflow) != null ? _c : false;
    }
  );
  const overlayDialogStyle = vue.computed(() => {
    if (_alignCenter.value) {
      return { display: "flex" };
    }
    return {};
  });
  const transitionConfig = vue.computed(() => {
    var _a2, _b, _c;
    const transition = (_c = (_b = props.transition) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.transition) != null ? _c : constants.DEFAULT_DIALOG_TRANSITION;
    const baseConfig = {
      name: transition,
      onAfterEnter: afterEnter,
      onBeforeLeave: beforeLeave,
      onAfterLeave: afterLeave
    };
    if (shared.isObject(transition)) {
      const config2 = { ...transition };
      const _mergeHook = (userHook, defaultHook) => {
        return (el) => {
          if (shared.isArray(userHook)) {
            userHook.forEach((fn) => {
              if (shared.isFunction(fn)) fn(el);
            });
          } else if (shared.isFunction(userHook)) {
            userHook(el);
          }
          defaultHook();
        };
      };
      config2.onAfterEnter = _mergeHook(config2.onAfterEnter, afterEnter);
      config2.onBeforeLeave = _mergeHook(config2.onBeforeLeave, beforeLeave);
      config2.onAfterLeave = _mergeHook(config2.onAfterLeave, afterLeave);
      if (!config2.name) {
        config2.name = constants.DEFAULT_DIALOG_TRANSITION;
        error.debugWarn(
          COMPONENT_NAME,
          `transition.name is missing when using object syntax, fallback to '${constants.DEFAULT_DIALOG_TRANSITION}'`
        );
      }
      return config2;
    }
    return baseConfig;
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(event.UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
    closing.value = false;
  }
  function beforeLeave() {
    closing.value = true;
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = core.useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = core.useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }
  function handleClose() {
    function hide(shouldCancel) {
      if (shouldCancel) return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    if (!core.isClient) return;
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }
  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }
  function onFocusoutPrevented(event) {
    var _a2;
    if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
      event.preventDefault();
    }
  }
  if (props.lockScroll) {
    index$3.useLockscreen(visible);
  }
  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }
  vue.watch(
    () => props.zIndex,
    () => {
      var _a2;
      zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
    }
  );
  vue.watch(
    () => props.modelValue,
    (val) => {
      var _a2;
      if (val) {
        closed.value = false;
        closing.value = false;
        open();
        rendered.value = true;
        zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
        vue.nextTick(() => {
          emit("open");
          if (targetRef.value) {
            targetRef.value.parentElement.scrollTop = 0;
            targetRef.value.parentElement.scrollLeft = 0;
            targetRef.value.scrollTop = 0;
          }
        });
      } else {
        if (visible.value) {
          close();
        }
      }
    }
  );
  vue.watch(
    () => props.fullscreen,
    (val) => {
      if (!targetRef.value) return;
      if (val) {
        lastPosition = targetRef.value.style.transform;
        targetRef.value.style.transform = "";
      } else {
        targetRef.value.style.transform = lastPosition;
      }
    }
  );
  vue.onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      rendered.value = true;
      open();
    }
  });
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style: style$1,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
    transitionConfig,
    _draggable,
    _alignCenter,
    _overflow,
    closing
  };
};

exports.useDialog = useDialog;
//# sourceMappingURL=use-dialog.js.map
