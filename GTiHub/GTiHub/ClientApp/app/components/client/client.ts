export interface IClient {
    clientId?: number;
    name: string;
    industry: string;
    created_By?: string;
    creation_Date?: Date;
    modified_By?: string;
    date_Modified?: string;
    projects?: Array<Object>;
}