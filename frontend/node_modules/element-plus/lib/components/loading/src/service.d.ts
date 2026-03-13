import type { LoadingInstance } from './loading';
import type { LoadingOptions } from './types';
import type { AppContext } from 'vue';
declare const Loading: {
    (options?: LoadingOptions, context?: AppContext | null): LoadingInstance;
    _context: AppContext | null;
};
export default Loading;
