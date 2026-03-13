'use strict';

const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref) => {
      ref.value = el;
    });
  };
};

exports.composeRefs = composeRefs;
//# sourceMappingURL=refs.js.map
