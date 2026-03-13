import { defineComponent, inject, renderSlot, h } from 'vue';
import { ElText } from '../../text/index.mjs';
import { NODE_INSTANCE_INJECTION_KEY, ROOT_TREE_INJECTION_KEY } from './tokens.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = defineComponent({
  name: "ElTreeNodeContent",
  props: {
    node: {
      type: Object,
      required: true
    },
    renderContent: Function
  },
  setup(props) {
    const ns = useNamespace("tree");
    const nodeInstance = inject(
      NODE_INSTANCE_INJECTION_KEY
    );
    const tree = inject(ROOT_TREE_INJECTION_KEY);
    return () => {
      const node = props.node;
      const { data, store } = node;
      return props.renderContent ? props.renderContent(h, { _self: nodeInstance, node, data, store }) : renderSlot(tree.ctx.slots, "default", { node, data }, () => [
        h(
          ElText,
          { tag: "span", truncated: true, class: ns.be("node", "label") },
          () => [node.label]
        )
      ]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=tree-node-content.vue2.mjs.map
