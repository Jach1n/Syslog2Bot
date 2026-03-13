import { defineComponent, getCurrentInstance, computed, inject, ref, reactive, watch, provide, onMounted, onBeforeUnmount, h, Fragment, withDirectives, vShow, nextTick } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import { ElCollapseTransition } from '../../collapse-transition/index.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue';
import { ElIcon } from '../../icon/index.mjs';
import useMenu from './use-menu.mjs';
import { useMenuCssVar } from './use-menu-css-var.mjs';
import { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from './tokens.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { iconPropType } from '../../../utils/vue/icon.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { throwError } from '../../../utils/error.mjs';
import { isUndefined } from '../../../utils/types.mjs';
import { isString } from '@vue/shared';
import { focusElement } from '../../../utils/dom/aria.mjs';

const subMenuProps = buildProps({
  /**
   * @description unique identification
   */
  index: {
    type: String,
    required: true
  },
  /**
   * @description timeout before showing a sub-menu(inherit `show-timeout` of the menu by default.)
   */
  showTimeout: Number,
  /**
   * @description timeout before hiding a sub-menu(inherit `hide-timeout` of the menu by default.)
   */
  hideTimeout: Number,
  /**
   * @description custom class name for the popup menu
   */
  popperClass: String,
  /**
   * @description custom style for the popup menu
   */
  popperStyle: {
    type: definePropType([String, Object])
  },
  /**
   * @description whether the sub-menu is disabled
   */
  disabled: Boolean,
  /**
   * @description whether popup menu is teleported to the body
   */
  teleported: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description offset of the popper (overrides the `popper` of menu)
   */
  popperOffset: Number,
  /**
   * @description Icon when menu are expanded and submenu are closed, `expand-close-icon` and `expand-open-icon` need to be passed together to take effect
   */
  expandCloseIcon: {
    type: iconPropType
  },
  /**
   * @description Icon when menu are expanded and submenu are opened, `expand-open-icon` and `expand-close-icon` need to be passed together to take effect
   */
  expandOpenIcon: {
    type: iconPropType
  },
  /**
   * @description Icon when menu are collapsed and submenu are closed, `collapse-close-icon` and `collapse-open-icon` need to be passed together to take effect
   */
  collapseCloseIcon: {
    type: iconPropType
  },
  /**
   * @description Icon when menu are collapsed and submenu are opened, `collapse-open-icon` and `collapse-close-icon` need to be passed together to take effect
   */
  collapseOpenIcon: {
    type: iconPropType
  }
});
const COMPONENT_NAME = "ElSubMenu";
var SubMenu = defineComponent({
  name: COMPONENT_NAME,
  props: subMenuProps,
  setup(props, { slots, expose }) {
    const instance = getCurrentInstance();
    const { indexPath, parentMenu } = useMenu(
      instance,
      computed(() => props.index)
    );
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const rootMenu = inject(MENU_INJECTION_KEY);
    if (!rootMenu) throwError(COMPONENT_NAME, "can not inject root menu");
    const subMenu = inject(
      `${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`
    );
    if (!subMenu) throwError(COMPONENT_NAME, "can not inject sub menu");
    const items = ref({});
    const subMenus = ref({});
    let timeout;
    const mouseInChild = ref(false);
    const verticalTitleRef = ref();
    const vPopper = ref();
    const isFirstLevel = computed(() => subMenu.level === 0);
    const currentPlacement = computed(
      () => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start"
    );
    const subMenuTitleIcon = computed(() => {
      const isExpandedMode = mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse;
      if (isExpandedMode) {
        if (props.expandCloseIcon && props.expandOpenIcon) {
          return opened.value ? props.expandOpenIcon : props.expandCloseIcon;
        }
        return ArrowDown;
      } else {
        if (props.collapseCloseIcon && props.collapseOpenIcon) {
          return opened.value ? props.collapseOpenIcon : props.collapseCloseIcon;
        }
        return ArrowRight;
      }
    });
    const appendToBody = computed(() => {
      const value = props.teleported;
      return isUndefined(value) ? isFirstLevel.value : value;
    });
    const menuTransitionName = computed(
      () => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`
    );
    const fallbackPlacements = computed(
      () => mode.value === "horizontal" && isFirstLevel.value ? [
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "left-start"
      ] : [
        "right-start",
        "right",
        "right-end",
        "left-start",
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end"
      ]
    );
    const opened = computed(() => rootMenu.openedMenus.includes(props.index));
    const active = computed(
      () => [...Object.values(items.value), ...Object.values(subMenus.value)].some(
        ({ active: active2 }) => active2
      )
    );
    const mode = computed(() => rootMenu.props.mode);
    const persistent = computed(() => rootMenu.props.persistent);
    const item = reactive({
      index: props.index,
      indexPath,
      active
    });
    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);
    const subMenuPopperOffset = computed(
      () => {
        var _a;
        return (_a = props.popperOffset) != null ? _a : rootMenu.props.popperOffset;
      }
    );
    const subMenuPopperClass = computed(
      () => {
        var _a;
        return (_a = props.popperClass) != null ? _a : rootMenu.props.popperClass;
      }
    );
    const subMenuPopperStyle = computed(
      () => {
        var _a;
        return (_a = props.popperStyle) != null ? _a : rootMenu.props.popperStyle;
      }
    );
    const subMenuShowTimeout = computed(
      () => {
        var _a;
        return (_a = props.showTimeout) != null ? _a : rootMenu.props.showTimeout;
      }
    );
    const subMenuHideTimeout = computed(
      () => {
        var _a;
        return (_a = props.hideTimeout) != null ? _a : rootMenu.props.hideTimeout;
      }
    );
    const doDestroy = () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = vPopper.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.popperInstanceRef) == null ? void 0 : _c.destroy();
    };
    const handleCollapseToggle = (value) => {
      if (!value) {
        doDestroy();
      }
    };
    const handleClick = () => {
      if (rootMenu.props.menuTrigger === "hover" && rootMenu.props.mode === "horizontal" || rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled)
        return;
      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value
      });
    };
    const handleMouseenter = (event, showTimeout = subMenuShowTimeout.value) => {
      var _a;
      if (event.type === "focus") return;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) {
        subMenu.mouseInChild.value = true;
        return;
      }
      subMenu.mouseInChild.value = true;
      timeout == null ? void 0 : timeout();
      ({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value);
      }, showTimeout));
      if (appendToBody.value) {
        (_a = parentMenu.value.vnode.el) == null ? void 0 : _a.dispatchEvent(new MouseEvent("mouseenter"));
      }
      if (event.type === "mouseenter" && event.target) {
        nextTick(() => {
          focusElement(event.target, { preventScroll: true });
        });
      }
    };
    const handleMouseleave = (deepDispatch = false) => {
      var _a;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
        subMenu.mouseInChild.value = false;
        return;
      }
      timeout == null ? void 0 : timeout();
      subMenu.mouseInChild.value = false;
      ({ stop: timeout } = useTimeoutFn(
        () => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value),
        subMenuHideTimeout.value
      ));
      if (appendToBody.value && deepDispatch) {
        (_a = subMenu.handleMouseleave) == null ? void 0 : _a.call(subMenu, true);
      }
    };
    watch(
      () => rootMenu.props.collapse,
      (value) => handleCollapseToggle(Boolean(value))
    );
    {
      const addSubMenu = (item2) => {
        subMenus.value[item2.index] = item2;
      };
      const removeSubMenu = (item2) => {
        delete subMenus.value[item2.index];
      };
      provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1
      });
    }
    expose({
      opened
    });
    onMounted(() => {
      rootMenu.addSubMenu(item);
      subMenu.addSubMenu(item);
    });
    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item);
      rootMenu.removeSubMenu(item);
    });
    return () => {
      var _a;
      const titleTag = [
        (_a = slots.title) == null ? void 0 : _a.call(slots),
        h(
          ElIcon,
          {
            class: nsSubMenu.e("icon-arrow"),
            style: {
              transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none"
            }
          },
          {
            default: () => isString(subMenuTitleIcon.value) ? h(instance.appContext.components[subMenuTitleIcon.value]) : h(subMenuTitleIcon.value)
          }
        )
      ];
      const child = rootMenu.isMenuPopup ? h(
        ElTooltip,
        {
          ref: vPopper,
          visible: opened.value,
          effect: "light",
          pure: true,
          offset: subMenuPopperOffset.value,
          showArrow: false,
          persistent: persistent.value,
          popperClass: subMenuPopperClass.value,
          popperStyle: subMenuPopperStyle.value,
          placement: currentPlacement.value,
          teleported: appendToBody.value,
          fallbackPlacements: fallbackPlacements.value,
          transition: menuTransitionName.value,
          gpuAcceleration: false
        },
        {
          content: () => {
            var _a2;
            return h(
              "div",
              {
                class: [
                  nsMenu.m(mode.value),
                  nsMenu.m("popup-container"),
                  subMenuPopperClass.value
                ],
                onMouseenter: (evt) => handleMouseenter(evt, 100),
                onMouseleave: () => handleMouseleave(true),
                onFocus: (evt) => handleMouseenter(evt, 100)
              },
              [
                h(
                  "ul",
                  {
                    class: [
                      nsMenu.b(),
                      nsMenu.m("popup"),
                      nsMenu.m(`popup-${currentPlacement.value}`)
                    ],
                    style: ulStyle.value
                  },
                  [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]
                )
              ]
            );
          },
          default: () => h(
            "div",
            {
              class: nsSubMenu.e("title"),
              onClick: handleClick
            },
            titleTag
          )
        }
      ) : h(Fragment, {}, [
        h(
          "div",
          {
            class: nsSubMenu.e("title"),
            ref: verticalTitleRef,
            onClick: handleClick
          },
          titleTag
        ),
        h(
          ElCollapseTransition,
          {},
          {
            default: () => {
              var _a2;
              return withDirectives(
                h(
                  "ul",
                  {
                    role: "menu",
                    class: [nsMenu.b(), nsMenu.m("inline")],
                    style: ulStyle.value
                  },
                  [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]
                ),
                [[vShow, opened.value]]
              );
            }
          }
        )
      ]);
      return h(
        "li",
        {
          class: [
            nsSubMenu.b(),
            nsSubMenu.is("active", active.value),
            nsSubMenu.is("opened", opened.value),
            nsSubMenu.is("disabled", props.disabled)
          ],
          role: "menuitem",
          ariaHaspopup: true,
          ariaExpanded: opened.value,
          onMouseenter: handleMouseenter,
          onMouseleave: () => handleMouseleave(),
          onFocus: handleMouseenter
        },
        [child]
      );
    };
  }
});

export { SubMenu as default, subMenuProps };
//# sourceMappingURL=sub-menu.mjs.map
