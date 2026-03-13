'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var notification_vue_vue_type_script_setup_true_lang = require('./notification.vue2.js');
var notification = require('./notification.js');
var core = require('@vueuse/core');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var error = require('../../../utils/error.js');

const notifications = {
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": []
};
const GAP_SIZE = 16;
let seed = 1;
const notify = function(options = {}, context) {
  if (!core.isClient) return { close: () => void 0 };
  if (shared.isString(options) || vue.isVNode(options)) {
    options = { message: options };
  }
  const position = options.position || "top-right";
  let verticalOffset = options.offset || 0;
  notifications[position].forEach(({ vm: vm2 }) => {
    var _a;
    verticalOffset += (((_a = vm2.el) == null ? void 0 : _a.offsetHeight) || 0) + GAP_SIZE;
  });
  verticalOffset += GAP_SIZE;
  const id = `notification_${seed++}`;
  const userOnClose = options.onClose;
  const props = {
    ...options,
    offset: verticalOffset,
    id,
    onClose: () => {
      close(id, position, userOnClose);
    }
  };
  let appendTo = document.body;
  if (types.isElement(options.appendTo)) {
    appendTo = options.appendTo;
  } else if (shared.isString(options.appendTo)) {
    appendTo = document.querySelector(options.appendTo);
  }
  if (!types.isElement(appendTo)) {
    error.debugWarn(
      "ElNotification",
      "the appendTo option is not an HTMLElement. Falling back to document.body."
    );
    appendTo = document.body;
  }
  const container = document.createElement("div");
  const vm = vue.createVNode(
    notification_vue_vue_type_script_setup_true_lang.default,
    props,
    shared.isFunction(props.message) ? props.message : vue.isVNode(props.message) ? () => props.message : null
  );
  vm.appContext = types.isUndefined(context) ? notify._context : context;
  vm.props.onDestroy = () => {
    vue.render(null, container);
  };
  vue.render(vm, container);
  notifications[position].push({ vm });
  appendTo.appendChild(container.firstElementChild);
  return {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vm.component.exposed.visible.value = false;
    }
  };
};
notification.notificationTypes.forEach((type) => {
  notify[type] = (options = {}, appContext) => {
    if (shared.isString(options) || vue.isVNode(options)) {
      options = {
        message: options
      };
    }
    return notify({ ...options, type }, appContext);
  };
});
function close(id, position, userOnClose) {
  const orientedNotifications = notifications[position];
  const idx = orientedNotifications.findIndex(
    ({ vm: vm2 }) => {
      var _a;
      return ((_a = vm2.component) == null ? void 0 : _a.props.id) === id;
    }
  );
  if (idx === -1) return;
  const { vm } = orientedNotifications[idx];
  if (!vm) return;
  userOnClose == null ? void 0 : userOnClose(vm);
  const removedHeight = vm.el.offsetHeight;
  const verticalPos = position.split("-")[0];
  orientedNotifications.splice(idx, 1);
  const len = orientedNotifications.length;
  if (len < 1) return;
  for (let i = idx; i < len; i++) {
    const { el, component } = orientedNotifications[i].vm;
    const pos = Number.parseInt(el.style[verticalPos], 10) - removedHeight - GAP_SIZE;
    component.props.offset = pos;
  }
}
function closeAll() {
  for (const orientedNotifications of Object.values(notifications)) {
    orientedNotifications.forEach(({ vm }) => {
      vm.component.exposed.visible.value = false;
    });
  }
}
function updateOffsets(position = "top-right") {
  var _a, _b, _c, _d;
  let verticalOffset = ((_c = (_b = (_a = notifications[position][0]) == null ? void 0 : _a.vm.component) == null ? void 0 : _b.props) == null ? void 0 : _c.offset) || 0;
  for (const { vm } of notifications[position]) {
    vm.component.props.offset = verticalOffset;
    verticalOffset += (((_d = vm.el) == null ? void 0 : _d.offsetHeight) || 0) + GAP_SIZE;
  }
}
notify.closeAll = closeAll;
notify.updateOffsets = updateOffsets;
notify._context = null;

exports.close = close;
exports.closeAll = closeAll;
exports.default = notify;
exports.updateOffsets = updateOffsets;
//# sourceMappingURL=notify.js.map
