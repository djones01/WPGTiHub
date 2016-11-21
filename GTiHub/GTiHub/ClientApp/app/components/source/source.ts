export class Source {
    constructor(
        public name: string,
        public description: string,
        public effective_Date: string,
        public active: boolean,
        public sourceFields: SourceField[]
    ) {
    }
}

export class SourceField {
    constructor(
        public name: string,
        public datatype: string,
        public active: boolean,
        public seqNum: number
    ) {
    }
}