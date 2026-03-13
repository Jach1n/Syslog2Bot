'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const tabPaneProps = runtime.buildProps({
  /**
   * @description title of the tab
   */
  label: {
    type: String,
    default: ""
  },
  /**
   * @description identifier corresponding to the name of Tabs, representing the alias of the tab-pane, the default is ordinal number of the tab-pane in the sequence, e.g. the first tab-pane is '0'
   */
  name: {
    type: [String, Number]
  },
  /**
   * @description whether Tab is closable
   */
  closable: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether Tab is disabled
   */
  disabled: Boolean,
  /**
   * @description whether Tab is lazily rendered
   */
  lazy: Boolean
});

exports.tabPaneProps = tabPaneProps;
//# sourceMappingURL=tab-pane.js.map
