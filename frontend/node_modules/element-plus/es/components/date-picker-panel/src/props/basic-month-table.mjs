import { selectionModeWithDefault, datePickerSharedProps } from './shared.mjs';
import { buildProps } from '../../../../utils/vue/props/runtime.mjs';

const basicMonthTableProps = buildProps({
  ...datePickerSharedProps,
  selectionMode: selectionModeWithDefault("month")
});

export { basicMonthTableProps };
//# sourceMappingURL=basic-month-table.mjs.map
