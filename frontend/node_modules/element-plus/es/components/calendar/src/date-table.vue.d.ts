declare var __VLS_1: {
    data: {
        isSelected: boolean;
        type: string;
        day: string;
        date: Date;
    };
};
type __VLS_Slots = {} & {
    'date-cell'?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{}, {
    /** @description toggle date panel */
    getFormattedDate: (day: number, type: import("./date-table").CalendarDateCellType) => import("dayjs").Dayjs;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    pick: (value: import("dayjs").Dayjs) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onPick?: ((value: import("dayjs").Dayjs) => any) | undefined;
}, {}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
