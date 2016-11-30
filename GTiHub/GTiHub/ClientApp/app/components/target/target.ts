export interface ITarget {
    name: string;
    description: string;
    effective_Date: Date;
    active: boolean;
    targetFields: ITargetField[];
    targetId?: number;
}

export interface ITargetField {
    name: string;
    datatype: string;
    active: boolean;
    seqNum: number;
    targetFieldId?: number;
    targetId?: number;
}