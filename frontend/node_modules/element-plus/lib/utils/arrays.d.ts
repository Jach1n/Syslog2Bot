export declare const unique: <T>(arr: T[]) => T[];
export declare const extractFirst: <T>(arr: T | T[]) => T;
type Many<T> = T | ReadonlyArray<T>;
/** like `_.castArray`, except falsy value returns empty array. */
export declare const castArray: <T>(arr: Many<T>) => T[];
export { castArray as ensureArray } from 'lodash-unified';
