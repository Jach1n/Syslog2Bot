'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var anchor = require('./anchor.js');
var vue = require('vue');
var core = require('@vueuse/core');
var constants = require('./constants.js');
var throttleByRaf = require('../../../utils/throttleByRaf.js');
var element = require('../../../utils/dom/element.js');
var scroll = require('../../../utils/dom/scroll.js');
var position = require('../../../utils/dom/position.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElAnchor"
  },
  __name: "anchor",
  props: anchor.anchorProps,
  emits: anchor.anchorEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = vue.useSlots();
    const currentAnchor = vue.ref("");
    const markerStyle = vue.ref({});
    const anchorRef = vue.ref(null);
    const markerRef = vue.ref(null);
    const containerEl = vue.ref();
    const links = {};
    let isScrolling = false;
    let currentScrollTop = 0;
    const ns = index.useNamespace("anchor");
    const cls = vue.computed(() => [
      ns.b(),
      props.type === "underline" ? ns.m("underline") : "",
      ns.m(props.direction)
    ]);
    const addLink = (state) => {
      links[state.href] = state.el;
    };
    const removeLink = (href) => {
      delete links[href];
    };
    const setCurrentAnchor = (href) => {
      const activeHref = currentAnchor.value;
      if (activeHref !== href) {
        currentAnchor.value = href;
        emit(event.CHANGE_EVENT, href);
      }
    };
    let clearAnimate = null;
    let currentTargetHref = "";
    const scrollToAnchor = (href) => {
      if (!containerEl.value) return;
      const target = element.getElement(href);
      if (!target) return;
      if (clearAnimate) {
        if (currentTargetHref === href) return;
        clearAnimate();
      }
      currentTargetHref = href;
      isScrolling = true;
      const scrollEle = scroll.getScrollElement(target, containerEl.value);
      const distance = position.getOffsetTopDistance(target, scrollEle);
      const max = scrollEle.scrollHeight - scrollEle.clientHeight;
      const to = Math.min(distance - props.offset, max);
      clearAnimate = scroll.animateScrollTo(
        containerEl.value,
        currentScrollTop,
        to,
        props.duration,
        () => {
          setTimeout(() => {
            isScrolling = false;
            currentTargetHref = "";
          }, 20);
        }
      );
    };
    const scrollTo = (href) => {
      if (href) {
        setCurrentAnchor(href);
        scrollToAnchor(href);
      }
    };
    const handleClick = (e, href) => {
      emit("click", e, href);
      scrollTo(href);
    };
    const handleScroll = throttleByRaf.throttleByRaf(() => {
      if (containerEl.value) {
        currentScrollTop = scroll.getScrollTop(containerEl.value);
      }
      const currentHref = getCurrentHref();
      if (isScrolling || types.isUndefined(currentHref)) return;
      setCurrentAnchor(currentHref);
    });
    const getCurrentHref = () => {
      if (!containerEl.value) return;
      const scrollTop = scroll.getScrollTop(containerEl.value);
      const anchorTopList = [];
      for (const href of Object.keys(links)) {
        const target = element.getElement(href);
        if (!target) continue;
        const scrollEle = scroll.getScrollElement(target, containerEl.value);
        const distance = position.getOffsetTopDistance(target, scrollEle);
        anchorTopList.push({
          top: distance - props.offset - props.bound,
          href
        });
      }
      anchorTopList.sort((prev, next) => prev.top - next.top);
      for (let i = 0; i < anchorTopList.length; i++) {
        const item = anchorTopList[i];
        const next = anchorTopList[i + 1];
        if (i === 0 && scrollTop === 0) {
          return props.selectScrollTop ? item.href : "";
        }
        if (item.top <= scrollTop && (!next || next.top > scrollTop)) {
          return item.href;
        }
      }
    };
    const getContainer = () => {
      const el = element.getElement(props.container);
      if (!el || types.isWindow(el)) {
        containerEl.value = window;
      } else {
        containerEl.value = el;
      }
    };
    core.useEventListener(containerEl, "scroll", handleScroll);
    const updateMarkerStyle = () => {
      vue.nextTick(() => {
        if (!anchorRef.value || !markerRef.value || !currentAnchor.value) {
          markerStyle.value = {};
          return;
        }
        const currentLinkEl = links[currentAnchor.value];
        if (!currentLinkEl) {
          markerStyle.value = {};
          return;
        }
        const anchorRect = anchorRef.value.getBoundingClientRect();
        const markerRect = markerRef.value.getBoundingClientRect();
        const linkRect = currentLinkEl.getBoundingClientRect();
        if (props.direction === "horizontal") {
          const left = linkRect.left - anchorRect.left;
          markerStyle.value = {
            left: `${left}px`,
            width: `${linkRect.width}px`,
            opacity: 1
          };
        } else {
          const top = linkRect.top - anchorRect.top + (linkRect.height - markerRect.height) / 2;
          markerStyle.value = {
            top: `${top}px`,
            opacity: 1
          };
        }
      });
    };
    vue.watch(currentAnchor, updateMarkerStyle);
    vue.watch(() => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    }, updateMarkerStyle);
    vue.onMounted(() => {
      getContainer();
      const hash = decodeURIComponent(window.location.hash);
      const target = element.getElement(hash);
      if (target) {
        scrollTo(hash);
      } else {
        handleScroll();
      }
    });
    vue.watch(
      () => props.container,
      () => {
        getContainer();
      }
    );
    vue.provide(constants.anchorKey, {
      ns,
      direction: props.direction,
      currentAnchor,
      addLink,
      removeLink,
      handleClick
    });
    __expose({
      scrollTo
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          ref_key: "anchorRef",
          ref: anchorRef,
          class: vue.normalizeClass(cls.value)
        },
        [
          __props.marker ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              ref_key: "markerRef",
              ref: markerRef,
              class: vue.normalizeClass(vue.unref(ns).e("marker")),
              style: vue.normalizeStyle(markerStyle.value)
            },
            null,
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("list"))
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
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
//# sourceMappingURL=anchor.vue2.js.map
