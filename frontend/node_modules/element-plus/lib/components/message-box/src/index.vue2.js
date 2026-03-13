'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$3 = require('../../button/index.js');
var index$2 = require('../../input/index.js');
var index$1 = require('../../overlay/index.js');
var index = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var focusTrap = require('../../focus-trap/src/focus-trap.vue.js');
var index$4 = require('../../../directives/trap-focus/index.js');
var validator = require('../../../utils/vue/validator.js');
var icon = require('../../../utils/vue/icon.js');
var useGlobalConfig = require('../../config-provider/src/hooks/use-global-config.js');
var index$5 = require('../../../hooks/use-id/index.js');
var index$6 = require('../../../hooks/use-draggable/index.js');
var shared = require('@vue/shared');
var index$7 = require('../../../hooks/use-lockscreen/index.js');
var index$8 = require('../../../hooks/use-same-target/index.js');

var _sfc_main = vue.defineComponent({
  name: "ElMessageBox",
  directives: {
    TrapFocus: index$4.default
  },
  components: {
    ElButton: index$3.ElButton,
    ElFocusTrap: focusTrap.default,
    ElInput: index$2.ElInput,
    ElOverlay: index$1.ElOverlay,
    ElIcon: index.ElIcon,
    ...icon.TypeComponents
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String,
      validator: validator.isValidComponentSize
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    draggable: Boolean,
    overflow: Boolean,
    roundButton: Boolean,
    container: {
      type: String,
      // default append to body
      default: "body"
    },
    boxType: {
      type: String,
      default: ""
    }
  },
  emits: ["vanish", "action"],
  setup(props, { emit }) {
    const {
      locale,
      zIndex,
      ns,
      size: btnSize
    } = useGlobalConfig.useGlobalComponentSettings(
      "message-box",
      vue.computed(() => props.buttonSize)
    );
    const { t } = locale;
    const { nextZIndex } = zIndex;
    const visible = vue.ref(false);
    const state = vue.reactive({
      // autofocus element when open message-box
      autofocus: true,
      beforeClose: null,
      callback: null,
      cancelButtonText: "",
      cancelButtonClass: "",
      confirmButtonText: "",
      confirmButtonClass: "",
      cancelButtonType: "",
      confirmButtonType: "primary",
      customClass: "",
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: "",
      closeIcon: "",
      inputPattern: null,
      inputPlaceholder: "",
      inputType: "text",
      inputValue: "",
      inputValidator: void 0,
      inputErrorMessage: "",
      message: "",
      modalFade: true,
      modalClass: "",
      showCancelButton: false,
      showConfirmButton: true,
      type: "",
      title: void 0,
      showInput: false,
      action: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonLoadingIcon: vue.markRaw(iconsVue.Loading),
      cancelButtonLoadingIcon: vue.markRaw(iconsVue.Loading),
      confirmButtonDisabled: false,
      editorErrorMessage: "",
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex()
    });
    const typeClass = vue.computed(() => {
      const type = state.type;
      return { [ns.bm("icon", type)]: type && icon.TypeComponentsMap[type] };
    });
    const contentId = index$5.useId();
    const inputId = index$5.useId();
    const iconComponent = vue.computed(() => {
      const type = state.type;
      return state.icon || type && icon.TypeComponentsMap[type] || "";
    });
    const hasMessage = vue.computed(() => !!state.message);
    const rootRef = vue.ref();
    const headerRef = vue.ref();
    const focusStartRef = vue.ref();
    const inputRef = vue.ref();
    const confirmRef = vue.ref();
    const confirmButtonClasses = vue.computed(() => state.confirmButtonClass);
    vue.watch(
      () => state.inputValue,
      async (val) => {
        await vue.nextTick();
        if (props.boxType === "prompt" && val) {
          validate();
        }
      },
      { immediate: true }
    );
    vue.watch(
      () => visible.value,
      (val) => {
        var _a, _b;
        if (val) {
          if (props.boxType !== "prompt") {
            if (state.autofocus) {
              focusStartRef.value = (_b = (_a = confirmRef.value) == null ? void 0 : _a.$el) != null ? _b : rootRef.value;
            } else {
              focusStartRef.value = rootRef.value;
            }
          }
          state.zIndex = nextZIndex();
        }
        if (props.boxType !== "prompt") return;
        if (val) {
          vue.nextTick().then(() => {
            var _a2;
            if (inputRef.value && inputRef.value.$el) {
              if (state.autofocus) {
                focusStartRef.value = (_a2 = getInputElement()) != null ? _a2 : rootRef.value;
              } else {
                focusStartRef.value = rootRef.value;
              }
            }
          });
        } else {
          state.editorErrorMessage = "";
          state.validateError = false;
        }
      }
    );
    const draggable = vue.computed(() => props.draggable);
    const overflow = vue.computed(() => props.overflow);
    const { isDragging } = index$6.useDraggable(rootRef, headerRef, draggable, overflow);
    vue.onMounted(async () => {
      await vue.nextTick();
      if (props.closeOnHashChange) {
        window.addEventListener("hashchange", doClose);
      }
    });
    vue.onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        window.removeEventListener("hashchange", doClose);
      }
    });
    function doClose() {
      if (!visible.value) return;
      visible.value = false;
      vue.nextTick(() => {
        if (state.action) emit("action", state.action);
      });
    }
    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
      }
    };
    const overlayEvent = index$8.useSameTarget(handleWrapperClick);
    const handleInputEnter = (e) => {
      var _a;
      if (state.inputType !== "textarea" && !((_a = inputRef.value) == null ? void 0 : _a.isComposing)) {
        e.preventDefault();
        return handleAction("confirm");
      }
    };
    const handleAction = (action) => {
      var _a;
      if (props.boxType === "prompt" && action === "confirm" && !validate()) {
        return;
      }
      state.action = action;
      if (state.beforeClose) {
        (_a = state.beforeClose) == null ? void 0 : _a.call(state, action, state, doClose);
      } else {
        doClose();
      }
    };
    const validate = () => {
      if (props.boxType === "prompt") {
        const inputPattern = state.inputPattern;
        if (inputPattern && !inputPattern.test(state.inputValue || "")) {
          state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
          state.validateError = true;
          return false;
        }
        const inputValidator = state.inputValidator;
        if (shared.isFunction(inputValidator)) {
          const validateResult = inputValidator(state.inputValue);
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
            state.validateError = true;
            return false;
          }
          if (shared.isString(validateResult)) {
            state.editorErrorMessage = validateResult;
            state.validateError = true;
            return false;
          }
        }
      }
      state.editorErrorMessage = "";
      state.validateError = false;
      return true;
    };
    const getInputElement = () => {
      var _a, _b;
      const inputRefs = (_a = inputRef.value) == null ? void 0 : _a.$refs;
      return (_b = inputRefs == null ? void 0 : inputRefs.input) != null ? _b : inputRefs == null ? void 0 : inputRefs.textarea;
    };
    const handleClose = () => {
      handleAction("close");
    };
    const onCloseRequested = () => {
      if (props.closeOnPressEscape) {
        handleClose();
      }
    };
    if (props.lockScroll) {
      index$7.useLockscreen(visible, { ns });
    }
    return {
      ...vue.toRefs(state),
      ns,
      overlayEvent,
      visible,
      hasMessage,
      typeClass,
      contentId,
      inputId,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      focusStartRef,
      headerRef,
      inputRef,
      isDragging,
      confirmRef,
      doClose,
      // for outside usage
      handleClose,
      // for out side usage
      onCloseRequested,
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=index.vue2.js.map
