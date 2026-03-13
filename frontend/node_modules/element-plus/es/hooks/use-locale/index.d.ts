import English from 'element-plus/es/locale/lang/en';
import type { MaybeRef } from '@vueuse/core';
import type { InjectionKey, Ref } from 'vue';
import type { FieldPath } from 'element-plus/es/utils';
import type { Language } from 'element-plus/es/locale';
export type LocaleKeys = Exclude<FieldPath<typeof English>, 'name' | 'el'> | (string & NonNullable<unknown>);
export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: LocaleKeys, option?: TranslatorOption) => string;
export type LocaleContext = {
    locale: Ref<Language>;
    lang: Ref<string>;
    t: Translator;
};
export declare const buildTranslator: (locale: MaybeRef<Language>) => Translator;
export declare const translate: (path: LocaleKeys, option: undefined | TranslatorOption, locale: Language) => string;
export declare const buildLocaleContext: (locale: MaybeRef<Language>) => LocaleContext;
export declare const localeContextKey: InjectionKey<Ref<Language | undefined>>;
export declare const useLocale: (localeOverrides?: Ref<Language | undefined>) => LocaleContext;
