import Timeline from './src/timeline.mjs';
export { timelineProps } from './src/timeline.mjs';
import _sfc_main from './src/timeline-item.vue2.mjs';
export { timelineItemProps } from './src/timeline-item.mjs';
export { TIMELINE_INJECTION_KEY } from './src/tokens.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElTimeline = withInstall(Timeline, {
  TimelineItem: _sfc_main
});
const ElTimelineItem = withNoopInstall(_sfc_main);

export { ElTimeline, ElTimelineItem, ElTimeline as default };
//# sourceMappingURL=index.mjs.map
