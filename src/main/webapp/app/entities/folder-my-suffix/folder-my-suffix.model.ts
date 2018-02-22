import { BaseEntity } from './../../shared';

export class FolderMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public creationDate?: any,
        public subject?: BaseEntity,
        public datas?: BaseEntity[],
    ) {
    }
}
