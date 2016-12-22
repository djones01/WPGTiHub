export interface IProject {
    projectId?: number;
    name: string;
    industry: string;
    created_By?: string;
    creation_Date?: Date;
    modified_By?: string;
    date_Modified?: Date;
    projects?: any[];
}

export class Project implements IProject {
    constructor(public name: string,
        public industry: string,
        public projectId?: number,
        public created_By?: string,
        public creation_Date?: Date,
        public modified_By?: string,
        public date_Modified?: Date,
        public projects?: any[]) { }
}