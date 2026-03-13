import { defineComponent, getCurrentInstance, ref, computed, provide, toRef, unref } from 'vue';
import { ElButton } from '../../button/index.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import { ElScrollbar } from '../../scrollbar/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import ElRovingFocusGroup from '../../roving-focus-group/src/roving-focus-group.vue.mjs';
import { ArrowDown } from '@element-plus/icons-vue';
import { dropdownProps } from './dropdown.mjs';
import { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY } from './tokens.mjs';
import { OnlyChild } from '../../slot/src/only-child.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';
import { useFormSize } from '../../form/src/hooks/use-form-common-props.mjs';
import { castArray } from 'lodash-unified';
import { useId } from '../../../hooks/use-id/index.mjs';

const { ButtonGroup: ElButtonGroup } = ElButton;
var _sfc_main = defineComponent({
  name: "ElDropdown",
  components: {
    ElButton,
    ElButtonGroup,
    ElScrollbar,
    ElTooltip,
    ElRovingFocusGroup,
    ElOnlyChild: OnlyChild,
    ElIcon,
    ArrowDown
  },
  props: dropdownProps,
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = getCurrentInstance();
    const ns = useNamespace("dropdown");
    const { t } = useLocale();
    const triggeringElementRef = ref();
    const referenceElementRef = ref();
    const popperRef = ref();
    const contentRef = ref();
    const scrollbar = ref(null);
    const currentTabId = ref(null);
    const isUsingKeyboard = ref(false);
    const wrapStyle = computed(() => ({
      maxHeight: addUnit(props.maxHeight)
    }));
    const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)]);
    const trigger = computed(() => castArray(props.trigger));
    const defaultTriggerId = useId().value;
    const triggerId = computed(() => props.id || defaultTriggerId);
    function handleClick() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose(void 0, 0);
    }
    function handleClose() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose();
    }
    function handleOpen() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onOpen();
    }
    const dropdownSize = useFormSize();
    function commandHandler(...args) {
      emit("command", ...args);
    }
    function onItemEnter() {
    }
    function onItemLeave() {
      const contentEl = unref(contentRef);
      trigger.value.includes("hover") && (contentEl == null ? void 0 : contentEl.focus({
        preventScroll: true
      }));
      currentTabId.value = null;
    }
    function handleCurrentTabIdChange(id) {
      currentTabId.value = id;
    }
    function handleBeforeShowTooltip() {
      emit("visible-change", true);
    }
    function handleShowTooltip(event) {
      var _a;
      isUsingKeyboard.value = (event == null ? void 0 : event.type) === "keydown";
      (_a = contentRef.value) == null ? void 0 : _a.focus();
    }
    function handleBeforeHideTooltip() {
      emit("visible-change", false);
    }
    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave,
      handleClose
    });
    provide(DROPDOWN_INSTANCE_INJECTION_KEY, {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, "trigger"),
      hideOnClick: toRef(props, "hideOnClick")
    });
    const handlerMainButtonClick = (event) => {
      emit("click", event);
    };
    return {
      t,
      ns,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      triggerId,
      currentTabId,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleClose,
      handleOpen,
      handleBeforeShowTooltip,
      handleShowTooltip,
      handleBeforeHideTooltip,
      popperRef,
      contentRef,
      triggeringElementRef,
      referenceElementRef
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=dropdown.vue2.mjs.map
