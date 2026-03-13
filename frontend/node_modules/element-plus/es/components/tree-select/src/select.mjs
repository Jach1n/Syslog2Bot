import { watch, nextTick, onMounted, computed, toRefs } from 'vue';
import { useEventListener } from '@vueuse/core';
import { pick } from 'lodash-unified';
import { ElSelect } from '../../select/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { getEventCode } from '../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';

const useSelect = (props, { attrs, emit }, {
  select,
  tree,
  key
}) => {
  const ns = useNamespace("tree-select");
  watch(
    () => props.data,
    () => {
      if (props.filterable) {
        nextTick(() => {
          var _a, _b;
          (_b = tree.value) == null ? void 0 : _b.filter((_a = select.value) == null ? void 0 : _a.states.inputValue);
        });
      }
    },
    { flush: "post" }
  );
  const focusLastNode = (listNode) => {
    var _a;
    const lastNode = listNode.at(-1);
    if (lastNode.expanded && lastNode.childNodes.at(-1)) {
      focusLastNode([lastNode.childNodes.at(-1)]);
    } else {
      const el = (_a = tree.value.el$) == null ? void 0 : _a.querySelector(
        `[data-key="${listNode.at(-1).key}"]`
      );
      el == null ? void 0 : el.focus({ preventScroll: true });
      return;
    }
  };
  onMounted(() => {
    useEventListener(
      () => {
        var _a;
        return (_a = select.value) == null ? void 0 : _a.$el;
      },
      "keydown",
      async (evt) => {
        const code = getEventCode(evt);
        const { dropdownMenuVisible } = select.value;
        if ([EVENT_CODE.down, EVENT_CODE.up].includes(code) && dropdownMenuVisible) {
          await nextTick();
          setTimeout(() => {
            var _a, _b, _c;
            if (EVENT_CODE.up === code) {
              const listNode = tree.value.store.root.childNodes;
              focusLastNode(listNode);
              return;
            }
            (_c = (_b = (_a = select.value.optionsArray[select.value.states.hoveringIndex].$el) == null ? void 0 : _a.parentNode) == null ? void 0 : _b.parentNode) == null ? void 0 : _c.focus({ preventScroll: true });
          });
        }
      },
      {
        capture: true
      }
    );
  });
  const result = {
    ...pick(toRefs(props), Object.keys(ElSelect.props)),
    ...attrs,
    class: computed(() => attrs.class),
    style: computed(() => attrs.style),
    // attrs is not reactive, when v-model binding source changes,
    // this listener is still old, see the bug(or test 'v-model source change'):
    // https://github.com/element-plus/element-plus/issues/14204
    "onUpdate:modelValue": (value) => emit(UPDATE_MODEL_EVENT, value),
    valueKey: key,
    popperClass: computed(() => {
      const classes = [ns.e("popper")];
      if (props.popperClass) classes.push(props.popperClass);
      return classes.join(" ");
    }),
    filterMethod: (keyword = "") => {
      var _a;
      if (props.filterMethod) {
        props.filterMethod(keyword);
      } else if (props.remoteMethod) {
        props.remoteMethod(keyword);
      } else {
        (_a = tree.value) == null ? void 0 : _a.filter(keyword);
      }
    }
  };
  return result;
};

export { useSelect };
//# sourceMappingURL=select.mjs.map
