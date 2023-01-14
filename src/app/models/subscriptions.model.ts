import { Server } from "./servers.model";

export class Subscriptions {

    constructor (
        public name: string,
        public email: string,
        public uid: string,
        public expiration?: number,
        public server?: Server,
        public status?: boolean,
        public fecha?: Date,
        public _id?: string,
        public suid?: string,
    ){}
    
}