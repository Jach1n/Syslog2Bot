import { defineComponent, provide, computed, h } from 'vue';
import { TIMELINE_INJECTION_KEY } from './tokens.mjs';
import { buildProps } from '../../../utils/vue/props/runtime.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { flattedChildren } from '../../../utils/vue/vnode.mjs';

const timelineProps = buildProps({
  /**
   * @description relative position of timeline and content
   */
  mode: {
    type: String,
    values: ["start", "alternate", "alternate-reverse", "end"],
    default: "start"
  },
  /**
   * @description whether reverse order
   */
  reverse: Boolean
});
const Timeline = defineComponent({
  name: "ElTimeline",
  props: timelineProps,
  setup(props, { slots }) {
    const ns = useNamespace("timeline");
    provide(TIMELINE_INJECTION_KEY, { props, slots });
    const timelineKls = computed(() => [ns.b(), ns.is(props.mode)]);
    return () => {
      var _a, _b;
      const children = flattedChildren(
        (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : []
      );
      return h(
        "ul",
        { class: timelineKls.value },
        props.reverse ? children.reverse() : children
      );
    };
  }
});

export { Timeline as default, timelineProps };
//# sourceMappingURL=timeline.mjs.map
