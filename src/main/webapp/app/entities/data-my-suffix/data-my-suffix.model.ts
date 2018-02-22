import { BaseEntity } from './../../shared';

export class DataMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public fullPath?: string,
        public size?: number,
        public creationDate?: any,
        public folder?: BaseEntity,
    ) {
    }
}
