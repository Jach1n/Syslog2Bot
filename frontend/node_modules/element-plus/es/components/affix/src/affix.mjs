import { teleportProps } from '../../teleport/src/teleport.mjs';
import { isBoolean, isNumber } from '../../../utils/types.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const affixProps = buildProps({
  /**
   * @description affix element zIndex value
   * */
  zIndex: {
    type: definePropType([Number, String]),
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
    type: teleportProps.to.type,
    default: "body"
  }
});
const affixEmits = {
  scroll: ({ scrollTop, fixed }) => isNumber(scrollTop) && isBoolean(fixed),
  [CHANGE_EVENT]: (fixed) => isBoolean(fixed)
};

export { affixEmits, affixProps };
//# sourceMappingURL=affix.mjs.map
