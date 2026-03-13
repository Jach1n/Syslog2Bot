import type { ComputedRef, InjectionKey, ToRefs, WritableComputedRef } from 'vue';
import type { CheckboxGroupProps } from './checkbox-group';
type CheckboxGroupContext = {
    modelValue?: WritableComputedRef<any>;
    changeEvent?: (...args: any) => any;
    disabled?: ComputedRef<boolean>;
} & ToRefs<Pick<CheckboxGroupProps, 'size' | 'min' | 'max' | 'validateEvent' | 'fill' | 'textColor'>>;
export declare const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext>;
export {};
