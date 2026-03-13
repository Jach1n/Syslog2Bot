import _sfc_main from './filter-panel.vue2.mjs';
import { resolveComponent, createBlock, openBlock, withCtx, createElementVNode, normalizeClass, createVNode, renderSlot, createElementBlock, Fragment, renderList, createTextVNode, toDisplayString } from 'vue';
import _export_sfc from '../../../_virtual/_plugin-vue_export-helper.mjs';

const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["tabindex", "aria-checked"];
const _hoisted_3 = ["tabindex", "aria-checked", "onClick"];
const _hoisted_4 = ["aria-label"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_arrow_up = resolveComponent("arrow-up");
  const _component_arrow_down = resolveComponent("arrow-down");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createBlock(_component_el_tooltip, {
    ref: "tooltipRef",
    offset: 0,
    placement: _ctx.placement,
    "show-arrow": false,
    trigger: "click",
    role: "dialog",
    teleported: "",
    effect: "light",
    pure: "",
    loop: "",
    "popper-class": _ctx.filterClassName,
    persistent: "",
    "append-to": _ctx.appendTo,
    onShow: _ctx.handleShowTooltip,
    onHide: _ctx.handleHideTooltip
  }, {
    content: withCtx(() => [
      _ctx.multiple ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          ref: "rootRef",
          tabindex: "-1",
          class: normalizeClass(_ctx.ns.e("multiple"))
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(_ctx.ns.e("content"))
            },
            [
              createVNode(_component_el_scrollbar, {
                "wrap-class": _ctx.ns.e("wrap")
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_checkbox_group, {
                    modelValue: _ctx.filteredValue,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filteredValue = $event),
                    class: normalizeClass(_ctx.ns.e("checkbox-group"))
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.filters, (filter) => {
                          return openBlock(), createBlock(_component_el_checkbox, {
                            key: filter.value,
                            value: filter.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(filter.text),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["value"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "class"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["wrap-class"])
            ],
            2
            /* CLASS */
          ),
          createElementVNode(
            "div",
            {
              class: normalizeClass(_ctx.ns.e("bottom"))
            },
            [
              createElementVNode("button", {
                class: normalizeClass(_ctx.ns.is("disabled", _ctx.filteredValue.length === 0)),
                disabled: _ctx.filteredValue.length === 0,
                type: "button",
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleConfirm && _ctx.handleConfirm(...args))
              }, toDisplayString(_ctx.t("el.table.confirmFilter")), 11, _hoisted_1),
              createElementVNode(
                "button",
                {
                  type: "button",
                  onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleReset && _ctx.handleReset(...args))
                },
                toDisplayString(_ctx.t("el.table.resetFilter")),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : (openBlock(), createElementBlock(
        "ul",
        {
          key: 1,
          ref: "rootRef",
          tabindex: "-1",
          role: "radiogroup",
          class: normalizeClass(_ctx.ns.e("list")),
          onKeydown: _cache[4] || (_cache[4] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
        },
        [
          createElementVNode("li", {
            role: "radio",
            class: normalizeClass([
              _ctx.ns.e("list-item"),
              _ctx.ns.is("active", _ctx.isPropAbsent(_ctx.filterValue))
            ]),
            tabindex: _ctx.checkedIndex === 0 ? 0 : -1,
            "aria-checked": _ctx.isPropAbsent(_ctx.filterValue),
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleSelect(null, 0))
          }, toDisplayString(_ctx.t("el.table.clearFilter")), 11, _hoisted_2),
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(_ctx.filters, (filter, idx) => {
              return openBlock(), createElementBlock("li", {
                key: filter.value,
                role: "radio",
                class: normalizeClass([_ctx.ns.e("list-item"), _ctx.ns.is("active", _ctx.isActive(filter))]),
                tabindex: _ctx.checkedIndex === idx + 1 ? 0 : -1,
                "aria-checked": _ctx.isActive(filter),
                onClick: ($event) => _ctx.handleSelect(filter.value, idx + 1)
              }, toDisplayString(filter.text), 11, _hoisted_3);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ))
    ]),
    default: withCtx(() => {
      var _a;
      return [
        createElementVNode("button", {
          type: "button",
          class: normalizeClass(`${_ctx.ns.namespace.value}-table__column-filter-trigger`),
          "aria-label": _ctx.t("el.table.filterLabel", { column: ((_a = _ctx.column) == null ? void 0 : _a.label) || "" })
        }, [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "filter-icon", {}, () => {
                var _a2;
                return [
                  ((_a2 = _ctx.column) == null ? void 0 : _a2.filterOpened) ? (openBlock(), createBlock(_component_arrow_up, { key: 0 })) : (openBlock(), createBlock(_component_arrow_down, { key: 1 }))
                ];
              })
            ]),
            _: 3
            /* FORWARDED */
          })
        ], 10, _hoisted_4)
      ];
    }),
    _: 3
    /* FORWARDED */
  }, 8, ["placement", "popper-class", "append-to", "onShow", "onHide"]);
}
var FilterPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { FilterPanel as default };
//# sourceMappingURL=filter-panel.vue.mjs.map
