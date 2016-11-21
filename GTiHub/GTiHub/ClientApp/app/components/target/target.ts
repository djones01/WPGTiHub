export class Target {
    constructor(
        public name: string,
        public description: string,
        public effective_Date: string,
        public active: boolean,
        public targetFields: TargetField[]
    ) {
    }
}

export class TargetField {
    constructor(
        public name: string,
        public datatype: string,
        public active: boolean,
        public seqNum: number
    ) {
    }
}