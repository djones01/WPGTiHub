export class FilePackage {
    constructor(
        public isPrimarySource: boolean,
        public sourceId: number,
        public sourceName: string,
        public sourceDescription: string,
        public firstRowHeader: boolean,
        public altHeadRow: number,
        public delimiter: string,
        public file: File
    ) {
    }
}