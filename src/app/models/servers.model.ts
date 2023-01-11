
export class Server {

    constructor (
        public name: string,
        public apikey: string,
        public url: string,
        public status?: boolean,
        public fecha?: Date,
        public serverId?: string,
        public sid?: string,
        public _id?: string,
    ){}
    
}