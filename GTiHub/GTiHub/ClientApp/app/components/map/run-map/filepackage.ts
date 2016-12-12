export interface IFilePackage {
    isPrimarySource: boolean;
    sourceId: number;
    sourceName: string;
    sourceDescription: string;
    firstRowHeader: boolean;
    altHeadRow: number;
    delimiter: string;
    file: File;
}