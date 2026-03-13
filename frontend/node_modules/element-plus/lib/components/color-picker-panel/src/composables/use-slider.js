'use strict';

var vue = require('vue');
var draggable = require('../utils/draggable.js');
var position = require('../../../../utils/dom/position.js');
var index = require('../../../../hooks/use-namespace/index.js');
var style = require('../../../../utils/dom/style.js');
var event = require('../../../../utils/dom/event.js');
var aria = require('../../../../constants/aria.js');

const useSlider = (props, { key, minValue, maxValue }) => {
  const instance = vue.getCurrentInstance();
  const thumb = vue.shallowRef();
  const bar = vue.shallowRef();
  const currentValue = vue.computed(() => props.color.get(key));
  function handleClick(event) {
    var _a;
    if (props.disabled) return;
    const target = event.target;
    if (target !== thumb.value) {
      handleDrag(event);
    }
    (_a = thumb.value) == null ? void 0 : _a.focus();
  }
  function handleDrag(event) {
    if (!bar.value || !thumb.value || props.disabled) return;
    const el = instance.vnode.el;
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = position.getClientXY(event);
    let value;
    if (!props.vertical) {
      let left = clientX - rect.left;
      left = Math.max(thumb.value.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumb.value.offsetWidth / 2);
      value = Math.round(
        (left - thumb.value.offsetWidth / 2) / (rect.width - thumb.value.offsetWidth) * maxValue
      );
    } else {
      let top = clientY - rect.top;
      top = Math.max(thumb.value.offsetHeight / 2, top);
      top = Math.min(top, rect.height - thumb.value.offsetHeight / 2);
      value = Math.round(
        (top - thumb.value.offsetHeight / 2) / (rect.height - thumb.value.offsetHeight) * maxValue
      );
    }
    props.color.set(key, value);
  }
  function handleKeydown(event$1) {
    if (props.disabled) return;
    const { shiftKey } = event$1;
    const code = event.getEventCode(event$1);
    const step = shiftKey ? 10 : 1;
    const reverse = key === "hue" ? -1 : 1;
    let isPreventDefault = true;
    switch (code) {
      case aria.EVENT_CODE.left:
      case aria.EVENT_CODE.down:
        incrementPosition(-step * reverse);
        break;
      case aria.EVENT_CODE.right:
      case aria.EVENT_CODE.up:
        incrementPosition(step * reverse);
        break;
      case aria.EVENT_CODE.home:
        props.color.set(key, key === "hue" ? maxValue : minValue);
        break;
      case aria.EVENT_CODE.end:
        props.color.set(key, key === "hue" ? minValue : maxValue);
        break;
      case aria.EVENT_CODE.pageDown:
        incrementPosition(-4 * reverse);
        break;
      case aria.EVENT_CODE.pageUp:
        incrementPosition(4 * reverse);
        break;
      default:
        isPreventDefault = false;
        break;
    }
    isPreventDefault && event$1.preventDefault();
  }
  function incrementPosition(step) {
    let next = currentValue.value + step;
    next = next < minValue ? minValue : next > maxValue ? maxValue : next;
    props.color.set(key, next);
  }
  return {
    thumb,
    bar,
    currentValue,
    handleDrag,
    handleClick,
    handleKeydown
  };
};
const useSliderDOM = (props, {
  namespace,
  maxValue,
  bar,
  thumb,
  currentValue,
  handleDrag,
  getBackground
}) => {
  const instance = vue.getCurrentInstance();
  const ns = index.useNamespace(namespace);
  const thumbLeft = vue.ref(0);
  const thumbTop = vue.ref(0);
  const background = vue.ref();
  function getThumbLeft() {
    if (!thumb.value) return 0;
    if (props.vertical) return 0;
    const el = instance.vnode.el;
    const value = currentValue.value;
    if (!el) return 0;
    return Math.round(
      value * (el.offsetWidth - thumb.value.offsetWidth / 2) / maxValue
    );
  }
  function getThumbTop() {
    if (!thumb.value) return 0;
    const el = instance.vnode.el;
    if (!props.vertical) return 0;
    const value = currentValue.value;
    if (!el) return 0;
    return Math.round(
      value * (el.offsetHeight - thumb.value.offsetHeight / 2) / maxValue
    );
  }
  function update() {
    thumbLeft.value = getThumbLeft();
    thumbTop.value = getThumbTop();
    background.value = getBackground == null ? void 0 : getBackground();
  }
  vue.onMounted(() => {
    if (!bar.value || !thumb.value) return;
    const dragConfig = {
      drag: (event) => {
        handleDrag(event);
      },
      end: (event) => {
        handleDrag(event);
      }
    };
    draggable.draggable(bar.value, dragConfig);
    draggable.draggable(thumb.value, dragConfig);
    update();
  });
  vue.watch(currentValue, () => update());
  vue.watch(
    () => props.color.value,
    () => update()
  );
  const rootKls = vue.computed(() => [
    ns.b(),
    ns.is("vertical", props.vertical),
    ns.is("disabled", props.disabled)
  ]);
  const barKls = vue.computed(() => ns.e("bar"));
  const thumbKls = vue.computed(() => ns.e("thumb"));
  const barStyle = vue.computed(() => ({ background: background.value }));
  const thumbStyle = vue.computed(() => ({
    left: style.addUnit(thumbLeft.value),
    top: style.addUnit(thumbTop.value)
  }));
  return {
    rootKls,
    barKls,
    barStyle,
    thumbKls,
    thumbStyle,
    thumbLeft,
    thumbTop,
    update
  };
};

exports.useSlider = useSlider;
exports.useSliderDOM = useSliderDOM;
//# sourceMappingURL=use-slider.js.map
