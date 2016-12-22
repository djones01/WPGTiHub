export interface IUser {
    userId?: number;
    firstName: string;
    lastName: string;
    title: string;
    phone: string;
    email: string;
    created_By?: string;
    creation_Date?: Date;
    modified_By?: string;
    date_Modified?: Date;
    projects?: any[];
}

export class User implements IUser {
    constructor(
        public firstName: string,
        public lastName: string,
        public title: string,
        public phone: string,
        public email: string,
        public userId?: number,
        public created_By?: string,
        public creation_Date?: Date,
        public modified_By?: string,
        public date_Modified?: Date,
        public projects?: any[]
    ) { }
}