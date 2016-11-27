export interface ISource {
    name: string;
    description: string;
    effective_Date: string;
    active: boolean;
    sourceFields: ISourceField[];
    sourceId?: number;
}

export interface ISourceField {
    name: string;
    datatype: string;
    active: boolean;
    seqNum: number;
}