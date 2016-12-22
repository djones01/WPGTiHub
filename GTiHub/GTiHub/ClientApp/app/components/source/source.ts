export interface ISource {
    name: string;
    description: string;
    effective_Date: string;
    active: boolean;
    sourceFields?: ISourceField[];
    sourceId?: number;
}

export interface ISourceField {
    name: string;
    datatype: string;
    active: boolean;
    seqNum: number;
}

export class Source implements ISource {
    constructor(
        public name: string,
        public description: string,
        public effective_Date: string,
        public active: boolean,
        public seqNum: number,
        public sourceFields?: SourceField[],
        public sourceId?: number
    ) { }
}

export class SourceField implements ISourceField {
    constructor(
        public name: string,
        public datatype: string,
        public active: boolean,
        public seqNum: number) {}
}