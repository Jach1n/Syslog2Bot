'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var message_vue_vue_type_script_setup_true_lang = require('./message.vue2.js');
var message$1 = require('./message.js');
var instance = require('./instance.js');
var configProvider = require('../../config-provider/src/config-provider.js');
var shared = require('@vue/shared');
var core = require('@vueuse/core');
var types = require('../../../utils/types.js');
var error = require('../../../utils/error.js');

let seed = 1;
const normalizeAppendTo = (normalized) => {
  const appendTo = normalized.appendTo;
  if (!appendTo) {
    normalized.appendTo = document.body;
  } else if (shared.isString(normalized.appendTo)) {
    let appendTo2 = document.querySelector(normalized.appendTo);
    if (!types.isElement(appendTo2)) {
      error.debugWarn(
        "ElMessage",
        "the appendTo option is not an HTMLElement. Falling back to document.body."
      );
      appendTo2 = document.body;
    }
    normalized.appendTo = appendTo2;
  }
};
const normalizePlacement = (normalized) => {
  if (!normalized.placement && shared.isString(configProvider.messageConfig.placement) && configProvider.messageConfig.placement) {
    normalized.placement = configProvider.messageConfig.placement;
  }
  if (!normalized.placement) {
    normalized.placement = message$1.MESSAGE_DEFAULT_PLACEMENT;
  }
  if (!message$1.messagePlacement.includes(normalized.placement)) {
    error.debugWarn(
      "ElMessage",
      `Invalid placement: ${normalized.placement}. Falling back to '${message$1.MESSAGE_DEFAULT_PLACEMENT}'.`
    );
    normalized.placement = message$1.MESSAGE_DEFAULT_PLACEMENT;
  }
};
const normalizeOptions = (params) => {
  const options = !params || shared.isString(params) || vue.isVNode(params) || shared.isFunction(params) ? { message: params } : params;
  const normalized = {
    ...message$1.messageDefaults,
    ...options
  };
  normalizeAppendTo(normalized);
  normalizePlacement(normalized);
  if (types.isBoolean(configProvider.messageConfig.grouping) && !normalized.grouping) {
    normalized.grouping = configProvider.messageConfig.grouping;
  }
  if (types.isNumber(configProvider.messageConfig.duration) && normalized.duration === 3e3) {
    normalized.duration = configProvider.messageConfig.duration;
  }
  if (types.isNumber(configProvider.messageConfig.offset) && normalized.offset === 16) {
    normalized.offset = configProvider.messageConfig.offset;
  }
  if (types.isBoolean(configProvider.messageConfig.showClose) && !normalized.showClose) {
    normalized.showClose = configProvider.messageConfig.showClose;
  }
  if (types.isBoolean(configProvider.messageConfig.plain) && !normalized.plain) {
    normalized.plain = configProvider.messageConfig.plain;
  }
  return normalized;
};
const closeMessage = (instance$1) => {
  const placement = instance$1.props.placement || message$1.MESSAGE_DEFAULT_PLACEMENT;
  const instances = instance.placementInstances[placement];
  const idx = instances.indexOf(instance$1);
  if (idx === -1) return;
  instances.splice(idx, 1);
  const { handler } = instance$1;
  handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = document.createElement("div");
  const props = {
    ...options,
    // now the zIndex will be used inside the message.vue component instead of here.
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      userOnClose == null ? void 0 : userOnClose();
      closeMessage(instance);
    },
    // clean message element preventing mem leak
    onDestroy: () => {
      vue.render(null, container);
    }
  };
  const vnode = vue.createVNode(
    message_vue_vue_type_script_setup_true_lang.default,
    props,
    shared.isFunction(props.message) || vue.isVNode(props.message) ? {
      default: shared.isFunction(props.message) ? props.message : () => props.message
    } : null
  );
  vnode.appContext = context || message._context;
  vue.render(vnode, container);
  appendTo.appendChild(container.firstElementChild);
  const vm = vnode.component;
  const handler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.exposed.close();
    }
  };
  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: vnode.component.props
  };
  return instance;
};
const message = (options = {}, context) => {
  if (!core.isClient) return { close: () => void 0 };
  const normalized = normalizeOptions(options);
  const instances = instance.getOrCreatePlacementInstances(
    normalized.placement || message$1.MESSAGE_DEFAULT_PLACEMENT
  );
  if (normalized.grouping && instances.length) {
    const instance2 = instances.find(
      ({ vnode: vm }) => {
        var _a;
        return ((_a = vm.props) == null ? void 0 : _a.message) === normalized.message;
      }
    );
    if (instance2) {
      instance2.props.repeatNum += 1;
      instance2.props.type = normalized.type;
      return instance2.handler;
    }
  }
  if (types.isNumber(configProvider.messageConfig.max) && instances.length >= configProvider.messageConfig.max) {
    return { close: () => void 0 };
  }
  const instance$1 = createMessage(normalized, context);
  instances.push(instance$1);
  return instance$1.handler;
};
message$1.messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});
function closeAll(type) {
  for (const placement in instance.placementInstances) {
    if (shared.hasOwn(instance.placementInstances, placement)) {
      const instances = [...instance.placementInstances[placement]];
      for (const instance of instances) {
        if (!type || type === instance.props.type) {
          instance.handler.close();
        }
      }
    }
  }
}
function closeAllByPlacement(placement) {
  if (!instance.placementInstances[placement]) return;
  const instances = [...instance.placementInstances[placement]];
  instances.forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;

exports.closeAll = closeAll;
exports.closeAllByPlacement = closeAllByPlacement;
exports.default = message;
//# sourceMappingURL=method.js.map
