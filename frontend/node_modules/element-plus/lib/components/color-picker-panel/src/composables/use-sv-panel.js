'use strict';

var vue = require('vue');
var draggable = require('../utils/draggable.js');
var index = require('../../../../hooks/use-namespace/index.js');
var style = require('../../../../utils/dom/style.js');
var event = require('../../../../utils/dom/event.js');
var aria = require('../../../../constants/aria.js');
var position = require('../../../../utils/dom/position.js');

const useSvPanel = (props) => {
  const instance = vue.getCurrentInstance();
  const cursorRef = vue.ref();
  const cursorTop = vue.ref(0);
  const cursorLeft = vue.ref(0);
  const background = vue.ref("hsl(0, 100%, 50%)");
  const saturation = vue.computed(() => props.color.get("saturation"));
  const brightness = vue.computed(() => props.color.get("value"));
  const hue = vue.computed(() => props.color.get("hue"));
  function handleClick(event) {
    var _a;
    if (props.disabled) return;
    const target = event.target;
    if (target !== cursorRef.value) {
      handleDrag(event);
    }
    (_a = cursorRef.value) == null ? void 0 : _a.focus({ preventScroll: true });
  }
  function handleDrag(event) {
    if (props.disabled) return;
    const el = instance.vnode.el;
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = position.getClientXY(event);
    let left = clientX - rect.left;
    let top = clientY - rect.top;
    left = Math.max(0, left);
    left = Math.min(left, rect.width);
    top = Math.max(0, top);
    top = Math.min(top, rect.height);
    cursorLeft.value = left;
    cursorTop.value = top;
    props.color.set({
      saturation: left / rect.width * 100,
      value: 100 - top / rect.height * 100
    });
  }
  function handleKeydown(event$1) {
    if (props.disabled) return;
    const { shiftKey } = event$1;
    const code = event.getEventCode(event$1);
    const step = shiftKey ? 10 : 1;
    let isPreventDefault = true;
    switch (code) {
      case aria.EVENT_CODE.left:
        incrementSaturation(-step);
        break;
      case aria.EVENT_CODE.right:
        incrementSaturation(step);
        break;
      case aria.EVENT_CODE.up:
        incrementBrightness(step);
        break;
      case aria.EVENT_CODE.down:
        incrementBrightness(-step);
        break;
      default:
        isPreventDefault = false;
        break;
    }
    isPreventDefault && event$1.preventDefault();
  }
  function incrementSaturation(step) {
    let next = saturation.value + step;
    next = next < 0 ? 0 : next > 100 ? 100 : next;
    props.color.set("saturation", next);
  }
  function incrementBrightness(step) {
    let next = brightness.value + step;
    next = next < 0 ? 0 : next > 100 ? 100 : next;
    props.color.set("value", next);
  }
  return {
    cursorRef,
    cursorTop,
    cursorLeft,
    background,
    saturation,
    brightness,
    hue,
    handleClick,
    handleDrag,
    handleKeydown
  };
};
const useSvPanelDOM = (props, {
  cursorTop,
  cursorLeft,
  background,
  handleDrag
}) => {
  const instance = vue.getCurrentInstance();
  const ns = index.useNamespace("color-svpanel");
  function update() {
    const saturation = props.color.get("saturation");
    const brightness = props.color.get("value");
    const el = instance.vnode.el;
    const { clientWidth: width, clientHeight: height } = el;
    cursorLeft.value = saturation * width / 100;
    cursorTop.value = (100 - brightness) * height / 100;
    background.value = `hsl(${props.color.get("hue")}, 100%, 50%)`;
  }
  vue.onMounted(() => {
    draggable.draggable(instance.vnode.el, {
      drag: (event) => {
        handleDrag(event);
      },
      end: (event) => {
        handleDrag(event);
      }
    });
    update();
  });
  vue.watch(
    [
      () => props.color.get("hue"),
      () => props.color.get("value"),
      () => props.color.value
    ],
    () => update()
  );
  const rootKls = vue.computed(() => ns.b());
  const cursorKls = vue.computed(() => ns.e("cursor"));
  const rootStyle = vue.computed(() => ({
    backgroundColor: background.value
  }));
  const cursorStyle = vue.computed(() => ({
    top: style.addUnit(cursorTop.value),
    left: style.addUnit(cursorLeft.value)
  }));
  return {
    rootKls,
    cursorKls,
    rootStyle,
    cursorStyle,
    update
  };
};

exports.useSvPanel = useSvPanel;
exports.useSvPanelDOM = useSvPanelDOM;
//# sourceMappingURL=use-sv-panel.js.map
