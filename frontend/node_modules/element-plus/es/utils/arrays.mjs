export { castArray as ensureArray } from 'lodash-unified';
import { isArray } from '@vue/shared';

const unique = (arr) => [...new Set(arr)];
const extractFirst = (arr) => {
  return isArray(arr) ? arr[0] : arr;
};
const castArray = (arr) => {
  if (!arr && arr !== 0) return [];
  return isArray(arr) ? arr : [arr];
};

export { castArray, extractFirst, unique };
//# sourceMappingURL=arrays.mjs.map
