'use strict';

var vue = require('vue');
var core = require('@vueuse/core');

function useContainer(layout) {
  const containerEl = vue.ref();
  const { width, height } = core.useElementSize(containerEl);
  const containerSize = vue.computed(() => {
    return layout.value === "horizontal" ? width.value : height.value;
  });
  return { containerEl, containerSize };
}

exports.useContainer = useContainer;
//# sourceMappingURL=useContainer.js.map
