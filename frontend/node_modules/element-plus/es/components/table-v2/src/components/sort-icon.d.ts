import { SortOrder } from '../constants';
import type { FunctionalComponent } from 'vue';
export type SortIconProps = {
    sortOrder: SortOrder;
    ariaLabel?: string;
    class?: JSX.IntrinsicAttributes['class'];
};
declare const SortIcon: FunctionalComponent<SortIconProps>;
export default SortIcon;
