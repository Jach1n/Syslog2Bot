import type { InjectionKey, Ref } from 'vue';
type ValueOnClear = string | number | boolean | Function | null;
export interface UseEmptyValuesProps {
    /**
     * @description empty values supported by the component
     */
    emptyValues?: unknown[];
    /**
     * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
     */
    valueOnClear?: ValueOnClear;
}
export declare const emptyValuesContextKey: InjectionKey<Ref<UseEmptyValuesProps>>;
export declare const SCOPE = "use-empty-values";
export declare const DEFAULT_EMPTY_VALUES: (string | null | undefined)[];
export declare const DEFAULT_VALUE_ON_CLEAR: undefined;
/**
 * @deprecated Removed after 3.0.0, Use `UseEmptyValuesProps` instead.
 */
export declare const useEmptyValuesProps: {
    readonly emptyValues: ArrayConstructor;
    readonly valueOnClear: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | ((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null))[], unknown, unknown, undefined, boolean>;
};
export declare const useEmptyValues: (props: UseEmptyValuesProps, defaultValue?: null | undefined) => {
    emptyValues: import("vue").ComputedRef<unknown[]>;
    valueOnClear: import("vue").ComputedRef<any>;
    isEmptyValue: (value: unknown) => boolean;
};
export {};
