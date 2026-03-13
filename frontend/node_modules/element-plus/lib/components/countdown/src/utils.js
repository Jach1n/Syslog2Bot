'use strict';

var types = require('../../../utils/types.js');

const timeUnits = [
  ["Y", 1e3 * 60 * 60 * 24 * 365],
  // years
  ["M", 1e3 * 60 * 60 * 24 * 30],
  // months
  ["D", 1e3 * 60 * 60 * 24],
  // days
  ["H", 1e3 * 60 * 60],
  // hours
  ["m", 1e3 * 60],
  // minutes
  ["s", 1e3],
  // seconds
  ["S", 1]
  // million seconds
];
const getTime = (value) => {
  return types.isNumber(value) ? new Date(value).getTime() : value.valueOf();
};
const formatTime = (timestamp, format) => {
  let timeLeft = timestamp;
  const escapeRegex = /\[([^\]]*)]/g;
  const replacedText = timeUnits.reduce((current, [name, unit]) => {
    const replaceRegex = new RegExp(`${name}+(?![^\\[\\]]*\\])`, "g");
    if (replaceRegex.test(current)) {
      const value = Math.floor(timeLeft / unit);
      timeLeft -= value * unit;
      return current.replace(
        replaceRegex,
        (match) => String(value).padStart(match.length, "0")
      );
    }
    return current;
  }, format);
  return replacedText.replace(escapeRegex, "$1");
};

exports.formatTime = formatTime;
exports.getTime = getTime;
//# sourceMappingURL=utils.js.map
