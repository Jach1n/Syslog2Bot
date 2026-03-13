'use strict';

var vue = require('vue');

const placementInstances = vue.shallowReactive(
  {}
);
const getOrCreatePlacementInstances = (placement) => {
  if (!placementInstances[placement]) {
    placementInstances[placement] = vue.shallowReactive([]);
  }
  return placementInstances[placement];
};
const getInstance = (id, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};
const getLastOffset = (id, placement) => {
  const { prev } = getInstance(id, placement);
  if (!prev) return 0;
  return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx > 0 ? 16 : offset;
};

exports.getInstance = getInstance;
exports.getLastOffset = getLastOffset;
exports.getOffsetOrSpace = getOffsetOrSpace;
exports.getOrCreatePlacementInstances = getOrCreatePlacementInstances;
exports.placementInstances = placementInstances;
//# sourceMappingURL=instance.js.map
