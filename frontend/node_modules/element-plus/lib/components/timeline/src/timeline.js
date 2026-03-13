'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var tokens = require('./tokens.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-namespace/index.js');
var vnode = require('../../../utils/vue/vnode.js');

const timelineProps = runtime.buildProps({
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
const Timeline = vue.defineComponent({
  name: "ElTimeline",
  props: timelineProps,
  setup(props, { slots }) {
    const ns = index.useNamespace("timeline");
    vue.provide(tokens.TIMELINE_INJECTION_KEY, { props, slots });
    const timelineKls = vue.computed(() => [ns.b(), ns.is(props.mode)]);
    return () => {
      var _a, _b;
      const children = vnode.flattedChildren(
        (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : []
      );
      return vue.h(
        "ul",
        { class: timelineKls.value },
        props.reverse ? children.reverse() : children
      );
    };
  }
});

exports.default = Timeline;
exports.timelineProps = timelineProps;
//# sourceMappingURL=timeline.js.map
