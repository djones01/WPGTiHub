export interface ITarget {
    name: string;
    description: string;
    effective_Date: string;
    active: boolean;
    targetFields?: ITargetField[];
    targetId?: number;
}

export interface ITargetField {
    name: string;
    datatype: string;
    active: boolean;
    seqNum: number;
}

export class Target implements ITarget {
    constructor(
        public name: string,
        public description: string,
        public effective_Date: string,
        public active: boolean,
        public seqNum: number,
        public targetFields?: TargetField[],
        public targetId?: number
    ) { }
}

export class TargetField implements ITargetField {
    constructor(
        public name: string,
        public datatype: string,
        public active: boolean,
        public seqNum: number) { }
}