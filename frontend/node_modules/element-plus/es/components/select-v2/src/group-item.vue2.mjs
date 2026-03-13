import { defineComponent } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    style: {
      type: Object
    },
    height: Number
  },
  setup() {
    const ns = useNamespace("select");
    return {
      ns
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=group-item.vue2.mjs.map
