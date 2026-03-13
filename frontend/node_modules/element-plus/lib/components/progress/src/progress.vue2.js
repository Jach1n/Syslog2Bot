'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var progress = require('./progress.js');
var vue = require('vue');
var index$1 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var index = require('../../../hooks/use-namespace/index.js');
var shared = require('@vue/shared');

const _hoisted_1 = ["aria-valuenow"];
const _hoisted_2 = { viewBox: "0 0 100 100" };
const _hoisted_3 = ["d", "stroke", "stroke-linecap", "stroke-width"];
const _hoisted_4 = ["d", "stroke", "opacity", "stroke-linecap", "stroke-width"];
const _hoisted_5 = { key: 0 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElProgress"
  },
  __name: "progress",
  props: progress.progressProps,
  setup(__props) {
    const STATUS_COLOR_MAP = {
      success: "#13ce66",
      exception: "#ff4949",
      warning: "#e6a23c",
      default: "#20a0ff"
    };
    const props = __props;
    const ns = index.useNamespace("progress");
    const barStyle = vue.computed(() => {
      const barStyle2 = {
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`
      };
      const color = getCurrentColor(props.percentage);
      if (color.includes("gradient")) {
        barStyle2.background = color;
      } else {
        barStyle2.backgroundColor = color;
      }
      return barStyle2;
    });
    const relativeStrokeWidth = vue.computed(
      () => (props.strokeWidth / props.width * 100).toFixed(1)
    );
    const radius = vue.computed(() => {
      if (["circle", "dashboard"].includes(props.type)) {
        return Number.parseInt(
          `${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`,
          10
        );
      }
      return 0;
    });
    const trackPath = vue.computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });
    const perimeter = vue.computed(() => 2 * Math.PI * radius.value);
    const rate = vue.computed(() => props.type === "dashboard" ? 0.75 : 1);
    const strokeDashoffset = vue.computed(() => {
      const offset = -1 * perimeter.value * (1 - rate.value) / 2;
      return `${offset}px`;
    });
    const trailPathStyle = vue.computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value
    }));
    const circlePathStyle = vue.computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
    }));
    const stroke = vue.computed(() => {
      let ret;
      if (props.color) {
        ret = getCurrentColor(props.percentage);
      } else {
        ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
      }
      return ret;
    });
    const statusIcon = vue.computed(() => {
      if (props.status === "warning") {
        return iconsVue.WarningFilled;
      }
      if (props.type === "line") {
        return props.status === "success" ? iconsVue.CircleCheck : iconsVue.CircleClose;
      } else {
        return props.status === "success" ? iconsVue.Check : iconsVue.Close;
      }
    });
    const progressTextSize = vue.computed(() => {
      return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });
    const content = vue.computed(() => props.format(props.percentage));
    function getColors(color) {
      const span = 100 / color.length;
      const seriesColors = color.map((seriesColor, index) => {
        if (shared.isString(seriesColor)) {
          return {
            color: seriesColor,
            percentage: (index + 1) * span
          };
        }
        return seriesColor;
      });
      return seriesColors.sort((a, b) => a.percentage - b.percentage);
    }
    const getCurrentColor = (percentage) => {
      var _a;
      const { color } = props;
      if (shared.isFunction(color)) {
        return color(percentage);
      } else if (shared.isString(color)) {
        return color;
      } else {
        const colors = getColors(color);
        for (const color2 of colors) {
          if (color2.percentage > percentage) return color2.color;
        }
        return (_a = colors[colors.length - 1]) == null ? void 0 : _a.color;
      }
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass([
          vue.unref(ns).b(),
          vue.unref(ns).m(__props.type),
          vue.unref(ns).is(__props.status),
          {
            [vue.unref(ns).m("without-text")]: !__props.showText,
            [vue.unref(ns).m("text-inside")]: __props.textInside
          }
        ]),
        role: "progressbar",
        "aria-valuenow": __props.percentage,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [
        __props.type === "line" ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 0,
            class: vue.normalizeClass(vue.unref(ns).b("bar"))
          },
          [
            vue.createElementVNode(
              "div",
              {
                class: vue.normalizeClass(vue.unref(ns).be("bar", "outer")),
                style: vue.normalizeStyle({ height: `${__props.strokeWidth}px` })
              },
              [
                vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass([
                      vue.unref(ns).be("bar", "inner"),
                      { [vue.unref(ns).bem("bar", "inner", "indeterminate")]: __props.indeterminate },
                      { [vue.unref(ns).bem("bar", "inner", "striped")]: __props.striped },
                      { [vue.unref(ns).bem("bar", "inner", "striped-flow")]: __props.stripedFlow }
                    ]),
                    style: vue.normalizeStyle(barStyle.value)
                  },
                  [
                    (__props.showText || _ctx.$slots.default) && __props.textInside ? (vue.openBlock(), vue.createElementBlock(
                      "div",
                      {
                        key: 0,
                        class: vue.normalizeClass(vue.unref(ns).be("bar", "innerText"))
                      },
                      [
                        vue.renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [
                          vue.createElementVNode(
                            "span",
                            null,
                            vue.toDisplayString(content.value),
                            1
                            /* TEXT */
                          )
                        ])
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ],
              6
              /* CLASS, STYLE */
            )
          ],
          2
          /* CLASS */
        )) : (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 1,
            class: vue.normalizeClass(vue.unref(ns).b("circle")),
            style: vue.normalizeStyle({ height: `${__props.width}px`, width: `${__props.width}px` })
          },
          [
            (vue.openBlock(), vue.createElementBlock("svg", _hoisted_2, [
              vue.createElementVNode("path", {
                class: vue.normalizeClass(vue.unref(ns).be("circle", "track")),
                d: trackPath.value,
                stroke: `var(${vue.unref(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
                "stroke-linecap": __props.strokeLinecap,
                "stroke-width": relativeStrokeWidth.value,
                fill: "none",
                style: vue.normalizeStyle(trailPathStyle.value)
              }, null, 14, _hoisted_3),
              vue.createElementVNode("path", {
                class: vue.normalizeClass(vue.unref(ns).be("circle", "path")),
                d: trackPath.value,
                stroke: stroke.value,
                fill: "none",
                opacity: __props.percentage ? 1 : 0,
                "stroke-linecap": __props.strokeLinecap,
                "stroke-width": relativeStrokeWidth.value,
                style: vue.normalizeStyle(circlePathStyle.value)
              }, null, 14, _hoisted_4)
            ]))
          ],
          6
          /* CLASS, STYLE */
        )),
        (__props.showText || _ctx.$slots.default) && !__props.textInside ? (vue.openBlock(), vue.createElementBlock(
          "div",
          {
            key: 2,
            class: vue.normalizeClass(vue.unref(ns).e("text")),
            style: vue.normalizeStyle({ fontSize: `${progressTextSize.value}px` })
          },
          [
            vue.renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [
              !__props.status ? (vue.openBlock(), vue.createElementBlock(
                "span",
                _hoisted_5,
                vue.toDisplayString(content.value),
                1
                /* TEXT */
              )) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), { key: 1 }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(statusIcon.value)))
                ]),
                _: 1
                /* STABLE */
              }))
            ])
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=progress.vue2.js.map
