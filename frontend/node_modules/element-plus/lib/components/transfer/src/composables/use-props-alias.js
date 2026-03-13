'use strict';

var vue = require('vue');

const usePropsAlias = (props) => {
  const initProps = {
    label: "label",
    key: "key",
    disabled: "disabled"
  };
  return vue.computed(() => ({
    ...initProps,
    ...props.props
  }));
};

exports.usePropsAlias = usePropsAlias;
//# sourceMappingURL=use-props-alias.js.map
