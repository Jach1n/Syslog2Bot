'use strict';

var core = require('@vueuse/core');

const rAF = (fn) => core.isClient ? window.requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => core.isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle);

exports.cAF = cAF;
exports.rAF = rAF;
//# sourceMappingURL=raf.js.map
