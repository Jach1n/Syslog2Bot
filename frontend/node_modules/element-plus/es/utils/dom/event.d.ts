export declare const composeEventHandlers: <E>(theirsHandler?: (event: E) => boolean | void, oursHandler?: (event: E) => void, { checkForDefaultPrevented }?: {
    checkForDefaultPrevented?: boolean | undefined;
}) => (event: E) => void;
type WhenMouseHandler = (e: PointerEvent) => any;
export declare const whenMouse: (handler: WhenMouseHandler) => WhenMouseHandler;
export declare const getEventCode: (event: KeyboardEvent) => string;
export declare const getEventKey: (event: KeyboardEvent) => string;
export {};
