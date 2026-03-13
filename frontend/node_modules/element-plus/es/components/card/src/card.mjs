import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const cardProps = buildProps({
  /**
   * @description title of the card. Also accepts a DOM passed by `slot#header`
   */
  header: {
    type: String,
    default: ""
  },
  /**
   * @description content of footer. Also accepts a DOM passed by `slot#footer`
   */
  footer: {
    type: String,
    default: ""
  },
  /**
   * @description CSS style of card body
   */
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  /**
   * @description custom class name of card footer
   */
  headerClass: String,
  /**
   * @description custom class name of card body
   */
  bodyClass: String,
  /**
   * @description custom class name of card footer
   */
  footerClass: String,
  /**
   * @description when to show card shadows
   */
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: void 0
  }
});
const cardContextKey = /* @__PURE__ */ Symbol("cardContextKey");

export { cardContextKey, cardProps };
//# sourceMappingURL=card.mjs.map
