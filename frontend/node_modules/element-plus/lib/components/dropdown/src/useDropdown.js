'use strict';

var vue = require('vue');
var tokens = require('./tokens.js');

const useDropdown = () => {
  const elDropdown = vue.inject(
    tokens.DROPDOWN_INSTANCE_INJECTION_KEY,
    {}
  );
  const _elDropdownSize = vue.computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    elDropdown,
    _elDropdownSize
  };
};

exports.useDropdown = useDropdown;
//# sourceMappingURL=useDropdown.js.map
