import { Subscriptions } from './subscriptions.model';

export class Payment {

    constructor (
        public subid: Subscriptions,
        public description: string,
        public method: string,
        public amount: number,
        public status?: boolean,
        public fecha?: Date,
    ){}
    
}