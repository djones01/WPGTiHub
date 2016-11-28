export interface ITarget {
    name: string;
    description: string;
    effective_Date: string;
    active: boolean;
    sourceFields: ITargetField[];
    targetId?: number;
}

export interface ITargetField {
    name: string;
    datatype: string;
    active: boolean;
    seqNum: number;
}