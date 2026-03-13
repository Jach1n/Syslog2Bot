'use strict';

var teleport = require('../../teleport/src/teleport.js');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const affixProps = runtime.buildProps({
  /**
   * @description affix element zIndex value
   * */
  zIndex: {
    type: runtime.definePropType([Number, String]),
    default: 100
  },
  /**
   * @description target container. (CSS selector)
   */
  target: {
    type: String,
    default: ""
  },
  /**
   * @description offset distance
   * */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description position of affix
   * */
  position: {
    type: String,
    values: ["top", "bottom"],
    default: "top"
  },
  /**
   * @description whether affix element is teleported, if `true` it will be teleported to where `append-to` sets
   * */
  teleported: Boolean,
  /**
   * @description which element the affix element appends to
   * */
  appendTo: {
    type: teleport.teleportProps.to.type,
    default: "body"
  }
});
const affixEmits = {
  scroll: ({ scrollTop, fixed }) => types.isNumber(scrollTop) && types.isBoolean(fixed),
  [event.CHANGE_EVENT]: (fixed) => types.isBoolean(fixed)
};

exports.affixEmits = affixEmits;
exports.affixProps = affixProps;
//# sourceMappingURL=affix.js.map
