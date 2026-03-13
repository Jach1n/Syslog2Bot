import { createVNode } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import { SortUp, SortDown } from '@element-plus/icons-vue';
import { SortOrder } from '../constants.mjs';

const SortIcon = (props) => {
  const {
    sortOrder
  } = props;
  return createVNode("button", {
    "type": "button",
    "aria-label": props.ariaLabel,
    "class": props.class
  }, [createVNode(ElIcon, {
    "size": 14
  }, {
    default: () => [sortOrder === SortOrder.ASC ? createVNode(SortUp, null, null) : createVNode(SortDown, null, null)]
  })]);
};

export { SortIcon as default };
//# sourceMappingURL=sort-icon.mjs.map
