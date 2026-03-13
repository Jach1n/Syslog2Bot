'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var useGlobalConfig = require('./hooks/use-global-config.js');
var configProviderProps = require('./config-provider-props.js');

const messageConfig = {
  placement: "top"
};
const ConfigProvider = vue.defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps.configProviderProps,
  setup(props, { slots }) {
    const config = useGlobalConfig.provideGlobalConfig(props);
    vue.watch(
      () => props.message,
      (val) => {
        var _a, _b;
        Object.assign(messageConfig, (_b = (_a = config == null ? void 0 : config.value) == null ? void 0 : _a.message) != null ? _b : {}, val != null ? val : {});
      },
      { immediate: true, deep: true }
    );
    return () => vue.renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
  }
});

exports.default = ConfigProvider;
exports.messageConfig = messageConfig;
//# sourceMappingURL=config-provider.js.map
