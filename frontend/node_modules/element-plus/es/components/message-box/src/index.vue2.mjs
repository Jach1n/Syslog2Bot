import { defineComponent, computed, ref, reactive, markRaw, watch, nextTick, onMounted, onBeforeUnmount, toRefs } from 'vue';
import { ElButton } from '../../button/index.mjs';
import { ElInput } from '../../input/index.mjs';
import { ElOverlay } from '../../overlay/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { Loading } from '@element-plus/icons-vue';
import ElFocusTrap from '../../focus-trap/src/focus-trap.vue.mjs';
import TrapFocus from '../../../directives/trap-focus/index.mjs';
import { isValidComponentSize } from '../../../utils/vue/validator.mjs';
import { TypeComponents, TypeComponentsMap } from '../../../utils/vue/icon.mjs';
import { useGlobalComponentSettings } from '../../config-provider/src/hooks/use-global-config.mjs';
import { useId } from '../../../hooks/use-id/index.mjs';
import { useDraggable } from '../../../hooks/use-draggable/index.mjs';
import { isFunction, isString } from '@vue/shared';
import { useLockscreen } from '../../../hooks/use-lockscreen/index.mjs';
import { useSameTarget } from '../../../hooks/use-same-target/index.mjs';

var _sfc_main = defineComponent({
  name: "ElMessageBox",
  directives: {
    TrapFocus
  },
  components: {
    ElButton,
    ElFocusTrap,
    ElInput,
    ElOverlay,
    ElIcon,
    ...TypeComponents
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String,
      validator: isValidComponentSize
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
    } = useGlobalComponentSettings(
      "message-box",
      computed(() => props.buttonSize)
    );
    const { t } = locale;
    const { nextZIndex } = zIndex;
    const visible = ref(false);
    const state = reactive({
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
      confirmButtonLoadingIcon: markRaw(Loading),
      cancelButtonLoadingIcon: markRaw(Loading),
      confirmButtonDisabled: false,
      editorErrorMessage: "",
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      // isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: nextZIndex()
    });
    const typeClass = computed(() => {
      const type = state.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const contentId = useId();
    const inputId = useId();
    const iconComponent = computed(() => {
      const type = state.type;
      return state.icon || type && TypeComponentsMap[type] || "";
    });
    const hasMessage = computed(() => !!state.message);
    const rootRef = ref();
    const headerRef = ref();
    const focusStartRef = ref();
    const inputRef = ref();
    const confirmRef = ref();
    const confirmButtonClasses = computed(() => state.confirmButtonClass);
    watch(
      () => state.inputValue,
      async (val) => {
        await nextTick();
        if (props.boxType === "prompt" && val) {
          validate();
        }
      },
      { immediate: true }
    );
    watch(
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
          nextTick().then(() => {
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
    const draggable = computed(() => props.draggable);
    const overflow = computed(() => props.overflow);
    const { isDragging } = useDraggable(rootRef, headerRef, draggable, overflow);
    onMounted(async () => {
      await nextTick();
      if (props.closeOnHashChange) {
        window.addEventListener("hashchange", doClose);
      }
    });
    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        window.removeEventListener("hashchange", doClose);
      }
    });
    function doClose() {
      if (!visible.value) return;
      visible.value = false;
      nextTick(() => {
        if (state.action) emit("action", state.action);
      });
    }
    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
      }
    };
    const overlayEvent = useSameTarget(handleWrapperClick);
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
        if (isFunction(inputValidator)) {
          const validateResult = inputValidator(state.inputValue);
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
            state.validateError = true;
            return false;
          }
          if (isString(validateResult)) {
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
      useLockscreen(visible, { ns });
    }
    return {
      ...toRefs(state),
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

export { _sfc_main as default };
//# sourceMappingURL=index.vue2.mjs.map
