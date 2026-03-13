'use strict';

var vue = require('vue');
var core = require('@vueuse/core');
var lodashUnified = require('lodash-unified');
var index$1 = require('../../select/index.js');
var index = require('../../../hooks/use-namespace/index.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');
var event$1 = require('../../../constants/event.js');

const useSelect = (props, { attrs, emit }, {
  select,
  tree,
  key
}) => {
  const ns = index.useNamespace("tree-select");
  vue.watch(
    () => props.data,
    () => {
      if (props.filterable) {
        vue.nextTick(() => {
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
  vue.onMounted(() => {
    core.useEventListener(
      () => {
        var _a;
        return (_a = select.value) == null ? void 0 : _a.$el;
      },
      "keydown",
      async (evt) => {
        const code = event.getEventCode(evt);
        const { dropdownMenuVisible } = select.value;
        if ([aria.EVENT_CODE.down, aria.EVENT_CODE.up].includes(code) && dropdownMenuVisible) {
          await vue.nextTick();
          setTimeout(() => {
            var _a, _b, _c;
            if (aria.EVENT_CODE.up === code) {
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
    ...lodashUnified.pick(vue.toRefs(props), Object.keys(index$1.ElSelect.props)),
    ...attrs,
    class: vue.computed(() => attrs.class),
    style: vue.computed(() => attrs.style),
    // attrs is not reactive, when v-model binding source changes,
    // this listener is still old, see the bug(or test 'v-model source change'):
    // https://github.com/element-plus/element-plus/issues/14204
    "onUpdate:modelValue": (value) => emit(event$1.UPDATE_MODEL_EVENT, value),
    valueKey: key,
    popperClass: vue.computed(() => {
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

exports.useSelect = useSelect;
//# sourceMappingURL=select.js.map
