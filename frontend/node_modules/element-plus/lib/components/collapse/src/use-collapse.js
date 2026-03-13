'use strict';

var vue = require('vue');
var constants = require('./constants.js');
var lodashUnified = require('lodash-unified');
var index = require('../../../hooks/use-namespace/index.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var error = require('../../../utils/error.js');
var event = require('../../../constants/event.js');

const SCOPE = "ElCollapse";
const useCollapse = (props, emit) => {
  const activeNames = vue.ref(lodashUnified.castArray(props.modelValue));
  const setActiveNames = (_activeNames) => {
    activeNames.value = _activeNames;
    const value = props.accordion ? activeNames.value[0] : activeNames.value;
    emit(event.UPDATE_MODEL_EVENT, value);
    emit(event.CHANGE_EVENT, value);
  };
  const handleChange = (name) => {
    if (props.accordion) {
      setActiveNames([activeNames.value[0] === name ? "" : name]);
    } else {
      const _activeNames = [...activeNames.value];
      const index = _activeNames.indexOf(name);
      if (index > -1) {
        _activeNames.splice(index, 1);
      } else {
        _activeNames.push(name);
      }
      setActiveNames(_activeNames);
    }
  };
  const handleItemClick = async (name) => {
    const { beforeCollapse } = props;
    if (!beforeCollapse) {
      handleChange(name);
      return;
    }
    const shouldChange = beforeCollapse(name);
    const isPromiseOrBool = [
      shared.isPromise(shouldChange),
      types.isBoolean(shouldChange)
    ].includes(true);
    if (!isPromiseOrBool) {
      error.throwError(
        SCOPE,
        "beforeCollapse must return type `Promise<boolean>` or `boolean`"
      );
    }
    if (shared.isPromise(shouldChange)) {
      shouldChange.then((result) => {
        if (result !== false) {
          handleChange(name);
        }
      }).catch((e) => {
        error.debugWarn(SCOPE, `some error occurred: ${e}`);
      });
    } else if (shouldChange) {
      handleChange(name);
    }
  };
  vue.watch(
    () => props.modelValue,
    () => activeNames.value = lodashUnified.castArray(props.modelValue),
    { deep: true }
  );
  vue.provide(constants.collapseContextKey, {
    activeNames,
    handleItemClick
  });
  return {
    activeNames,
    setActiveNames
  };
};
const useCollapseDOM = (props) => {
  const ns = index.useNamespace("collapse");
  const rootKls = vue.computed(() => [
    ns.b(),
    ns.b(`icon-position-${props.expandIconPosition}`)
  ]);
  return {
    rootKls
  };
};

exports.useCollapse = useCollapse;
exports.useCollapseDOM = useCollapseDOM;
//# sourceMappingURL=use-collapse.js.map
