'use strict';

var vue = require('vue');
var constants = require('./constants.js');

const usePagination = () => vue.inject(constants.elPaginationKey, {});

exports.usePagination = usePagination;
//# sourceMappingURL=usePagination.js.map
