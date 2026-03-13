'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var lodashUnified = require('lodash-unified');
var index$1 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var menuBar = require('./utils/menu-bar.js');
var menuCollapseTransition_vue_vue_type_script_setup_true_lang = require('./menu-collapse-transition.vue2.js');
var subMenu = require('./sub-menu.js');
var useMenuCssVar = require('./use-menu-css-var.js');
var tokens = require('./tokens.js');
var index$2 = require('../../../directives/click-outside/index.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');
var typescript = require('../../../utils/typescript.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var index = require('../../../hooks/use-namespace/index.js');
var vnode = require('../../../utils/vue/vnode.js');

const menuProps = runtime.buildProps({
  /**
   * @description menu display mode
   */
  mode: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "vertical"
  },
  /**
   * @description index of active menu on page load
   */
  defaultActive: {
    type: String,
    default: ""
  },
  /**
   * @description array that contains indexes of currently active sub-menus
   */
  defaultOpeneds: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  /**
   * @description whether only one sub-menu can be active
   */
  uniqueOpened: Boolean,
  /**
   * @description whether `vue-router` mode is activated. If true, index will be used as 'path' to activate the route action. Use with `default-active` to set the active item on load.
   */
  router: Boolean,
  /**
   * @description how sub-menus are triggered, only works when `mode` is 'horizontal'
   */
  menuTrigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  /**
   * @description whether the menu is collapsed (available only in vertical mode)
   */
  collapse: Boolean,
  /**
   * @description background color of Menu (hex format) (deprecated, use `--bg-color` instead)
   * @deprecated use `--bg-color` instead
   */
  backgroundColor: String,
  /**
   * @description text color of Menu (hex format) (deprecated, use `--text-color` instead)
   * @deprecated use `--text-color` instead
   */
  textColor: String,
  /**
   * @description text color of currently active menu item (hex format) (deprecated, use `--active-color` instead)
   * @deprecated use `--active-color` instead
   */
  activeTextColor: String,
  /**
   * @description optional, whether menu is collapsed when clicking outside
   */
  closeOnClickOutside: Boolean,
  /**
   * @description whether to enable the collapse transition
   */
  collapseTransition: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether the menu is ellipsis (available only in horizontal mode)
   */
  ellipsis: {
    type: Boolean,
    default: true
  },
  /**
   * @description offset of the popper (effective for all submenus)
   */
  popperOffset: {
    type: Number,
    default: 6
  },
  /**
   * @description custom ellipsis icon (available only in horizontal mode and ellipsis is true)
   */
  ellipsisIcon: {
    type: icon.iconPropType,
    default: () => iconsVue.More
  },
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light` when menu is collapsed
   */
  popperEffect: {
    type: runtime.definePropType(String),
    default: "dark"
  },
  /**
   * @description custom class name for all popup menus
   */
  popperClass: String,
  /**
   * @description custom style for all popup menus
   */
  popperStyle: {
    type: runtime.definePropType([String, Object])
  },
  /**
   * @description control timeout for all menus before showing
   */
  showTimeout: {
    type: Number,
    default: 300
  },
  /**
   * @description control timeout for all menus before hiding
   */
  hideTimeout: {
    type: Number,
    default: 300
  },
  /**
   * @description when menu inactive and `persistent` is `false` , dropdown menu will be destroyed
   */
  persistent: {
    type: Boolean,
    default: true
  }
});
const checkIndexPath = (indexPath) => shared.isArray(indexPath) && indexPath.every((path) => shared.isString(path));
const menuEmits = {
  close: (index, indexPath) => shared.isString(index) && checkIndexPath(indexPath),
  open: (index, indexPath) => shared.isString(index) && checkIndexPath(indexPath),
  select: (index, indexPath, item, routerResult) => shared.isString(index) && checkIndexPath(indexPath) && shared.isObject(item) && (types.isUndefined(routerResult) || routerResult instanceof Promise)
};
const DEFAULT_MORE_ITEM_WIDTH = 64;
var Menu = vue.defineComponent({
  name: "ElMenu",
  props: menuProps,
  emits: menuEmits,
  setup(props, { emit, slots, expose }) {
    const instance = vue.getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const menu = vue.ref();
    const subMenu$1 = vue.ref();
    const nsMenu = index.useNamespace("menu");
    const nsSubMenu = index.useNamespace("sub-menu");
    let moreItemWidth = DEFAULT_MORE_ITEM_WIDTH;
    const sliceIndex = vue.ref(-1);
    const openedMenus = vue.ref(
      props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []
    );
    const activeIndex = vue.ref(props.defaultActive);
    const items = vue.ref({});
    const subMenus = vue.ref({});
    const isMenuPopup = vue.computed(
      () => props.mode === "horizontal" || props.mode === "vertical" && props.collapse
    );
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value];
      if (!activeItem || props.mode === "horizontal" || props.collapse) return;
      const indexPath = activeItem.indexPath;
      indexPath.forEach((index) => {
        const subMenu2 = subMenus.value[index];
        subMenu2 && openMenu(index, subMenu2.indexPath);
      });
    };
    const openMenu = (index, indexPath) => {
      if (openedMenus.value.includes(index)) return;
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter(
          (index2) => indexPath.includes(index2)
        );
      }
      openedMenus.value.push(index);
      emit("open", index, indexPath);
    };
    const close = (index) => {
      const i = openedMenus.value.indexOf(index);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
    };
    const closeMenu = (index, indexPath) => {
      close(index);
      emit("close", index, indexPath);
    };
    const handleSubMenuClick = ({
      index,
      indexPath
    }) => {
      const isOpened = openedMenus.value.includes(index);
      isOpened ? closeMenu(index, indexPath) : openMenu(index, indexPath);
    };
    const handleMenuItemClick = (menuItem) => {
      if (props.mode === "horizontal" || props.collapse) {
        openedMenus.value = [];
      }
      const { index, indexPath } = menuItem;
      if (lodashUnified.isNil(index) || lodashUnified.isNil(indexPath)) return;
      if (props.router && router) {
        const route = menuItem.route || index;
        const routerResult = router.push(route).then((res) => {
          if (!res) activeIndex.value = index;
          return res;
        });
        emit(
          "select",
          index,
          indexPath,
          { index, indexPath, route },
          routerResult
        );
      } else {
        activeIndex.value = index;
        emit("select", index, indexPath, { index, indexPath });
      }
    };
    const updateActiveIndex = (val) => {
      var _a;
      const itemsInData = items.value;
      const item = itemsInData[val] || activeIndex.value && itemsInData[activeIndex.value] || itemsInData[props.defaultActive];
      activeIndex.value = (_a = item == null ? void 0 : item.index) != null ? _a : val;
    };
    const calcMenuItemWidth = (menuItem) => {
      const computedStyle = getComputedStyle(menuItem);
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
      const marginRight = Number.parseInt(computedStyle.marginRight, 10);
      return menuItem.offsetWidth + marginLeft + marginRight || 0;
    };
    const calcSliceIndex = () => {
      if (!menu.value) return -1;
      const items2 = Array.from(menu.value.childNodes).filter(
        (item) => item.nodeName !== "#comment" && (item.nodeName !== "#text" || item.nodeValue)
      );
      const computedMenuStyle = getComputedStyle(menu.value);
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
      const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let sliceIndex2 = 0;
      items2.forEach((item, index) => {
        calcWidth += calcMenuItemWidth(item);
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex2 = index + 1;
        }
      });
      return sliceIndex2 === items2.length ? -1 : sliceIndex2;
    };
    const getIndexPath = (index) => subMenus.value[index].indexPath;
    const debounce = (fn, wait = 33.34) => {
      let timer;
      return () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, wait);
      };
    };
    let isFirstTimeRender = true;
    const handleResize = () => {
      const el = core.unrefElement(subMenu$1);
      if (el) moreItemWidth = calcMenuItemWidth(el) || DEFAULT_MORE_ITEM_WIDTH;
      if (sliceIndex.value === calcSliceIndex()) return;
      const callback = () => {
        sliceIndex.value = -1;
        vue.nextTick(() => {
          sliceIndex.value = calcSliceIndex();
        });
      };
      isFirstTimeRender ? callback() : debounce(callback)();
      isFirstTimeRender = false;
    };
    vue.watch(
      () => props.defaultActive,
      (currentActive) => {
        if (!items.value[currentActive]) {
          activeIndex.value = "";
        }
        updateActiveIndex(currentActive);
      }
    );
    vue.watch(
      () => props.collapse,
      (value) => {
        if (value) openedMenus.value = [];
      }
    );
    vue.watch(items.value, initMenu);
    let resizeStopper;
    vue.watchEffect(() => {
      if (props.mode === "horizontal" && props.ellipsis)
        resizeStopper = core.useResizeObserver(menu, handleResize).stop;
      else resizeStopper == null ? void 0 : resizeStopper();
    });
    const mouseInChild = vue.ref(false);
    {
      const addSubMenu = (item) => {
        subMenus.value[item.index] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.index];
      };
      const addMenuItem = (item) => {
        items.value[item.index] = item;
      };
      const removeMenuItem = (item) => {
        delete items.value[item.index];
      };
      vue.provide(
        tokens.MENU_INJECTION_KEY,
        vue.reactive({
          props,
          openedMenus,
          items,
          subMenus,
          activeIndex,
          isMenuPopup,
          addMenuItem,
          removeMenuItem,
          addSubMenu,
          removeSubMenu,
          openMenu,
          closeMenu,
          handleMenuItemClick,
          handleSubMenuClick
        })
      );
      vue.provide(`${tokens.SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild,
        level: 0
      });
    }
    vue.onMounted(() => {
      if (props.mode === "horizontal") {
        new menuBar.default(instance.vnode.el, nsMenu.namespace.value);
      }
    });
    {
      const open = (index) => {
        const { indexPath } = subMenus.value[index];
        indexPath.forEach((i) => openMenu(i, indexPath));
      };
      expose({
        open,
        close,
        updateActiveIndex,
        handleResize
      });
    }
    const ulStyle = useMenuCssVar.useMenuCssVar(props, 0);
    return () => {
      var _a, _b;
      let slot = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : [];
      const vShowMore = [];
      if (props.mode === "horizontal" && menu.value) {
        const originalSlot = vnode.flattedChildren(slot).filter((vnode) => {
          return (vnode == null ? void 0 : vnode.shapeFlag) !== 8;
        });
        const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
        const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
        if ((slotMore == null ? void 0 : slotMore.length) && props.ellipsis) {
          slot = slotDefault;
          vShowMore.push(
            vue.h(
              subMenu.default,
              {
                ref: subMenu$1,
                index: "sub-menu-more",
                class: nsSubMenu.e("hide-arrow"),
                popperOffset: props.popperOffset
              },
              {
                title: () => vue.h(
                  index$1.ElIcon,
                  {
                    class: nsSubMenu.e("icon-more")
                  },
                  {
                    default: () => vue.h(props.ellipsisIcon)
                  }
                ),
                default: () => slotMore
              }
            )
          );
        }
      }
      const directives = props.closeOnClickOutside ? [
        [
          index$2.default,
          () => {
            if (!openedMenus.value.length) return;
            if (!mouseInChild.value) {
              openedMenus.value.forEach(
                (openedMenu) => emit("close", openedMenu, getIndexPath(openedMenu))
              );
              openedMenus.value = [];
            }
          }
        ]
      ] : [];
      const vMenu = vue.withDirectives(
        vue.h(
          "ul",
          {
            key: String(props.collapse),
            role: "menubar",
            ref: menu,
            style: ulStyle.value,
            class: {
              [nsMenu.b()]: true,
              [nsMenu.m(props.mode)]: true,
              [nsMenu.m("collapse")]: props.collapse
            }
          },
          [...slot, ...vShowMore]
        ),
        directives
      );
      if (props.collapseTransition && props.mode === "vertical") {
        return vue.h(menuCollapseTransition_vue_vue_type_script_setup_true_lang.default, () => vMenu);
      }
      return vMenu;
    };
  }
});

exports.default = Menu;
exports.menuEmits = menuEmits;
exports.menuProps = menuProps;
//# sourceMappingURL=menu.js.map
