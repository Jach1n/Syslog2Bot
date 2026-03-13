'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var description = require('./description.js');
var vue = require('vue');
var descriptionsRow_vue_vue_type_script_setup_true_lang = require('./descriptions-row.vue2.js');
var token = require('./token.js');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var vnode = require('../../../utils/vue/vnode.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElDescriptions"
  },
  __name: "description",
  props: description.descriptionProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("descriptions");
    const descriptionsSize = useFormCommonProps.useFormSize();
    const slots = vue.useSlots();
    vue.provide(token.descriptionsKey, props);
    const descriptionKls = vue.computed(() => [ns.b(), ns.m(descriptionsSize.value)]);
    const filledNode = (node, span, count, isLast = false) => {
      if (!node.props) {
        node.props = {};
      }
      if (span > count) {
        node.props.span = count;
      }
      if (isLast) {
        node.props.span = span;
      }
      return node;
    };
    const getRows = () => {
      if (!slots.default) return [];
      const children = vnode.flattedChildren(slots.default()).filter(
        (node) => {
          var _a;
          return ((_a = node == null ? void 0 : node.type) == null ? void 0 : _a.name) === constants.COMPONENT_NAME;
        }
      );
      const rows = [];
      let temp = [];
      let count = props.column;
      let totalSpan = 0;
      const rowspanTemp = [];
      children.forEach((node, index) => {
        var _a, _b, _c;
        const span = ((_a = node.props) == null ? void 0 : _a.span) || 1;
        const rowspan = ((_b = node.props) == null ? void 0 : _b.rowspan) || 1;
        const rowNo = rows.length;
        rowspanTemp[rowNo] || (rowspanTemp[rowNo] = 0);
        if (rowspan > 1) {
          for (let i = 1; i < rowspan; i++) {
            rowspanTemp[_c = rowNo + i] || (rowspanTemp[_c] = 0);
            rowspanTemp[rowNo + i]++;
            totalSpan++;
          }
        }
        if (rowspanTemp[rowNo] > 0) {
          count -= rowspanTemp[rowNo];
          rowspanTemp[rowNo] = 0;
        }
        if (index < children.length - 1) {
          totalSpan += span > count ? count : span;
        }
        if (index === children.length - 1) {
          const lastSpan = props.column - totalSpan % props.column;
          temp.push(filledNode(node, lastSpan, count, true));
          rows.push(temp);
          return;
        }
        if (span < count) {
          count -= span;
          temp.push(node);
        } else {
          temp.push(filledNode(node, span, count));
          rows.push(temp);
          count = props.column;
          temp = [];
        }
      });
      return rows;
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(descriptionKls.value)
        },
        [
          __props.title || __props.extra || _ctx.$slots.title || _ctx.$slots.extra ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("header"))
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("title"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "title", {}, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(__props.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("extra"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "extra", {}, () => [
                    vue.createTextVNode(
                      vue.toDisplayString(__props.extra),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("body"))
            },
            [
              vue.createElementVNode(
                "table",
                {
                  class: vue.normalizeClass([vue.unref(ns).e("table"), vue.unref(ns).is("bordered", __props.border)])
                },
                [
                  vue.createElementVNode("tbody", null, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(getRows(), (row, _index) => {
                        return vue.openBlock(), vue.createBlock(descriptionsRow_vue_vue_type_script_setup_true_lang.default, {
                          key: _index,
                          row
                        }, null, 8, ["row"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=description.vue2.js.map
