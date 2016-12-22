export interface IClient {
    clientId?: number;
    name: string;
    industry: string;
    created_By?: string;
    creation_Date?: Date;
    modified_By?: string;
    date_Modified?: Date;
    projects?: any[];
}

export class Client implements IClient {
    constructor(public name: string,
        public industry: string,
        public clientId?: number,
        public created_By?: string,
        public creation_Date?: Date,
        public modified_By?: string,
        public date_Modified?: Date,
        public projects?: any[]) {}
}