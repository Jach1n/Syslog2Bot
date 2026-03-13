import { descriptionsRowProps } from './descriptions-row.mjs';
import { defineComponent, inject, createElementBlock, unref, openBlock, Fragment, createElementVNode, renderList, createBlock, createVNode } from 'vue';
import ElDescriptionsCell from './descriptions-cell.mjs';
import { descriptionsKey } from './token.mjs';

const _hoisted_1 = { key: 1 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElDescriptionsRow"
  },
  __name: "descriptions-row",
  props: descriptionsRowProps,
  setup(__props) {
    const descriptions = inject(descriptionsKey, {});
    return (_ctx, _cache) => {
      return unref(descriptions).direction === "vertical" ? (openBlock(), createElementBlock(
        Fragment,
        { key: 0 },
        [
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.row, (cell, _index) => {
                return openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: `tr1-${_index}`,
                  cell,
                  tag: "th",
                  type: "label"
                }, null, 8, ["cell"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createElementVNode("tr", null, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(__props.row, (cell, _index) => {
                return openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: `tr2-${_index}`,
                  cell,
                  tag: "td",
                  type: "content"
                }, null, 8, ["cell"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (openBlock(), createElementBlock("tr", _hoisted_1, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList(__props.row, (cell, _index) => {
            return openBlock(), createElementBlock(
              Fragment,
              {
                key: `tr3-${_index}`
              },
              [
                unref(descriptions).border ? (openBlock(), createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    createVNode(unref(ElDescriptionsCell), {
                      cell,
                      tag: "td",
                      type: "label"
                    }, null, 8, ["cell"]),
                    createVNode(unref(ElDescriptionsCell), {
                      cell,
                      tag: "td",
                      type: "content"
                    }, null, 8, ["cell"])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (openBlock(), createBlock(unref(ElDescriptionsCell), {
                  key: 1,
                  cell,
                  tag: "td",
                  type: "both"
                }, null, 8, ["cell"]))
              ],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]));
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=descriptions-row.vue2.mjs.map
