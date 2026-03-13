'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const anchorLinkProps = runtime.buildProps({
  /**
   * @description the text content of the anchor link
   */
  title: String,
  /**
   * @description The address of the anchor link
   */
  href: String
});

exports.anchorLinkProps = anchorLinkProps;
//# sourceMappingURL=anchor-link.js.map
