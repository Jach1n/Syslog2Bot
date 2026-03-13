import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const splitterProps = buildProps({
  layout: {
    type: String,
    default: "horizontal",
    values: ["horizontal", "vertical"]
  },
  lazy: Boolean
});
const splitterEmits = {
  resizeStart: (index, sizes) => true,
  resize: (index, sizes) => true,
  resizeEnd: (index, sizes) => true,
  collapse: (index, type, sizes) => true
};

export { splitterEmits, splitterProps };
//# sourceMappingURL=splitter.mjs.map
