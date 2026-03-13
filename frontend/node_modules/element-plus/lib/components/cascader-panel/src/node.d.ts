import type { CascaderConfig, CascaderNodePathValue, CascaderNodeValue, CascaderOption } from './types';
type ChildrenData = CascaderOption[] | undefined;
declare class Node {
    readonly data: CascaderOption;
    readonly config: CascaderConfig;
    readonly parent?: Node | undefined;
    readonly root: boolean;
    readonly uid: number;
    readonly level: number;
    readonly value: CascaderNodeValue;
    readonly label: string;
    readonly pathNodes: Node[];
    readonly pathValues: CascaderNodePathValue;
    readonly pathLabels: string[];
    childrenData: ChildrenData;
    children: Node[];
    text: string;
    loaded: boolean;
    /**
     * Is it checked
     *
     * @default false
     */
    checked: boolean;
    /**
     * Used to indicate the intermediate state of unchecked and fully checked child nodes
     *
     * @default false
     */
    indeterminate: boolean;
    /**
     * Loading Status
     *
     * @default false
     */
    loading: boolean;
    constructor(data: CascaderOption, config: CascaderConfig, parent?: Node | undefined, root?: boolean);
    get isDisabled(): boolean;
    get isLeaf(): boolean;
    get valueByOption(): CascaderNodeValue | CascaderNodePathValue;
    appendChild(childData: CascaderOption): Node;
    calcText(allLevels: boolean, separator: string): string;
    broadcast(checked: boolean): void;
    emit(): void;
    onParentCheck(checked: boolean): void;
    onChildCheck(): void;
    setCheckState(checked: boolean): void;
    doCheck(checked: boolean): void;
}
export default Node;
