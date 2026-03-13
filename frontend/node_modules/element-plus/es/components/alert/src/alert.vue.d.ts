import { TypeComponentsMap } from 'element-plus/es/utils';
import type { AlertProps } from './alert';
declare var __VLS_11: {}, __VLS_18: {}, __VLS_20: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_11) => any;
} & {
    title?: (props: typeof __VLS_18) => any;
} & {
    default?: (props: typeof __VLS_20) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<AlertProps>, {
    title: string;
    description: string;
    type: string;
    closable: boolean;
    closeText: string;
    effect: string;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (evt: MouseEvent) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<AlertProps>, {
    title: string;
    description: string;
    type: string;
    closable: boolean;
    closeText: string;
    effect: string;
}>>> & {
    onClose?: ((evt: MouseEvent) => any) | undefined;
}, {
    title: string;
    type: keyof typeof TypeComponentsMap;
    description: string;
    effect: "light" | "dark";
    closable: boolean;
    closeText: string;
}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
