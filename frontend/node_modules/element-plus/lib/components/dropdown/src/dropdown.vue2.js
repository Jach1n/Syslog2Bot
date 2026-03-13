'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$3 = require('../../button/index.js');
var index$1 = require('../../tooltip/index.js');
var index$2 = require('../../scrollbar/index.js');
var index = require('../../icon/index.js');
var rovingFocusGroup = require('../../roving-focus-group/src/roving-focus-group.vue.js');
var iconsVue = require('@element-plus/icons-vue');
var dropdown = require('./dropdown.js');
var tokens = require('./tokens.js');
var onlyChild = require('../../slot/src/only-child.js');
var index$4 = require('../../../hooks/use-namespace/index.js');
var index$5 = require('../../../hooks/use-locale/index.js');
var style = require('../../../utils/dom/style.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var lodashUnified = require('lodash-unified');
var index$6 = require('../../../hooks/use-id/index.js');

const { ButtonGroup: ElButtonGroup } = index$3.ElButton;
var _sfc_main = vue.defineComponent({
  name: "ElDropdown",
  components: {
    ElButton: index$3.ElButton,
    ElButtonGroup,
    ElScrollbar: index$2.ElScrollbar,
    ElTooltip: index$1.ElTooltip,
    ElRovingFocusGroup: rovingFocusGroup.default,
    ElOnlyChild: onlyChild.OnlyChild,
    ElIcon: index.ElIcon,
    ArrowDown: iconsVue.ArrowDown
  },
  props: dropdown.dropdownProps,
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = vue.getCurrentInstance();
    const ns = index$4.useNamespace("dropdown");
    const { t } = index$5.useLocale();
    const triggeringElementRef = vue.ref();
    const referenceElementRef = vue.ref();
    const popperRef = vue.ref();
    const contentRef = vue.ref();
    const scrollbar = vue.ref(null);
    const currentTabId = vue.ref(null);
    const isUsingKeyboard = vue.ref(false);
    const wrapStyle = vue.computed(() => ({
      maxHeight: style.addUnit(props.maxHeight)
    }));
    const dropdownTriggerKls = vue.computed(() => [ns.m(dropdownSize.value)]);
    const trigger = vue.computed(() => lodashUnified.castArray(props.trigger));
    const defaultTriggerId = index$6.useId().value;
    const triggerId = vue.computed(() => props.id || defaultTriggerId);
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
    const dropdownSize = useFormCommonProps.useFormSize();
    function commandHandler(...args) {
      emit("command", ...args);
    }
    function onItemEnter() {
    }
    function onItemLeave() {
      const contentEl = vue.unref(contentRef);
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
    vue.provide(tokens.DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: vue.computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave,
      handleClose
    });
    vue.provide(tokens.DROPDOWN_INSTANCE_INJECTION_KEY, {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: vue.toRef(props, "trigger"),
      hideOnClick: vue.toRef(props, "hideOnClick")
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

exports.default = _sfc_main;
//# sourceMappingURL=dropdown.vue2.js.map
