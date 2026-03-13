type TextAreaHeight = {
    height: string;
    minHeight?: string;
};
export declare const looseToNumber: (val: any) => any;
export declare function calcTextareaHeight(targetElement: HTMLTextAreaElement, minRows?: number, maxRows?: number): TextAreaHeight;
export {};
