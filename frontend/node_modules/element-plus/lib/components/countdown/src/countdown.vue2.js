'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var countdown = require('./countdown.js');
var vue = require('vue');
var index = require('../../statistic/index.js');
var utils = require('./utils.js');
var raf = require('../../../utils/raf.js');
var event = require('../../../constants/event.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCountdown"
  },
  __name: "countdown",
  props: countdown.countdownProps,
  emits: countdown.countdownEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let timer;
    const rawValue = vue.ref(0);
    const displayValue = vue.computed(() => utils.formatTime(rawValue.value, props.format));
    const formatter = (val) => utils.formatTime(val, props.format);
    const stopTimer = () => {
      if (timer) {
        raf.cAF(timer);
        timer = void 0;
      }
    };
    const startTimer = () => {
      const timestamp = utils.getTime(props.value);
      const frameFunc = () => {
        let diff = timestamp - Date.now();
        emit(event.CHANGE_EVENT, diff);
        if (diff <= 0) {
          diff = 0;
          stopTimer();
          emit("finish");
        } else {
          timer = raf.rAF(frameFunc);
        }
        rawValue.value = diff;
      };
      timer = raf.rAF(frameFunc);
    };
    vue.onMounted(() => {
      rawValue.value = utils.getTime(props.value) - Date.now();
      vue.watch(
        () => [props.value, props.format],
        () => {
          stopTimer();
          startTimer();
        },
        {
          immediate: true
        }
      );
    });
    vue.onBeforeUnmount(() => {
      stopTimer();
    });
    __expose({
      /**
       * @description current display value
       */
      displayValue
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index.ElStatistic), {
        value: rawValue.value,
        title: __props.title,
        prefix: __props.prefix,
        suffix: __props.suffix,
        "value-style": __props.valueStyle,
        formatter
      }, vue.createSlots({
        _: 2
        /* DYNAMIC */
      }, [
        vue.renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, name)
            ])
          };
        })
      ]), 1032, ["value", "title", "prefix", "suffix", "value-style"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=countdown.vue2.js.map
