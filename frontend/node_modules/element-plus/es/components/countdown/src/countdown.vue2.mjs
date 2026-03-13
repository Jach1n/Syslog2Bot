import { countdownEmits, countdownProps } from './countdown.mjs';
import { defineComponent, ref, computed, onMounted, watch, onBeforeUnmount, createBlock, openBlock, unref, createSlots, renderList, withCtx, renderSlot } from 'vue';
import { ElStatistic } from '../../statistic/index.mjs';
import { formatTime, getTime } from './utils.mjs';
import { rAF, cAF } from '../../../utils/raf.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCountdown"
  },
  __name: "countdown",
  props: countdownProps,
  emits: countdownEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let timer;
    const rawValue = ref(0);
    const displayValue = computed(() => formatTime(rawValue.value, props.format));
    const formatter = (val) => formatTime(val, props.format);
    const stopTimer = () => {
      if (timer) {
        cAF(timer);
        timer = void 0;
      }
    };
    const startTimer = () => {
      const timestamp = getTime(props.value);
      const frameFunc = () => {
        let diff = timestamp - Date.now();
        emit(CHANGE_EVENT, diff);
        if (diff <= 0) {
          diff = 0;
          stopTimer();
          emit("finish");
        } else {
          timer = rAF(frameFunc);
        }
        rawValue.value = diff;
      };
      timer = rAF(frameFunc);
    };
    onMounted(() => {
      rawValue.value = getTime(props.value) - Date.now();
      watch(
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
    onBeforeUnmount(() => {
      stopTimer();
    });
    __expose({
      /**
       * @description current display value
       */
      displayValue
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElStatistic), {
        value: rawValue.value,
        title: __props.title,
        prefix: __props.prefix,
        suffix: __props.suffix,
        "value-style": __props.valueStyle,
        formatter
      }, createSlots({
        _: 2
        /* DYNAMIC */
      }, [
        renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, name)
            ])
          };
        })
      ]), 1032, ["value", "title", "prefix", "suffix", "value-style"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=countdown.vue2.mjs.map
