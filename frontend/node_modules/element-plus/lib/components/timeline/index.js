'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var timeline = require('./src/timeline.js');
var timelineItem_vue_vue_type_script_setup_true_lang = require('./src/timeline-item.vue2.js');
var timelineItem = require('./src/timeline-item.js');
var tokens = require('./src/tokens.js');
var install = require('../../utils/vue/install.js');

const ElTimeline = install.withInstall(timeline.default, {
  TimelineItem: timelineItem_vue_vue_type_script_setup_true_lang.default
});
const ElTimelineItem = install.withNoopInstall(timelineItem_vue_vue_type_script_setup_true_lang.default);

exports.timelineProps = timeline.timelineProps;
exports.timelineItemProps = timelineItem.timelineItemProps;
exports.TIMELINE_INJECTION_KEY = tokens.TIMELINE_INJECTION_KEY;
exports.ElTimeline = ElTimeline;
exports.ElTimelineItem = ElTimelineItem;
exports.default = ElTimeline;
//# sourceMappingURL=index.js.map
