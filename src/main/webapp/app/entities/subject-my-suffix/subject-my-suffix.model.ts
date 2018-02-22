import { BaseEntity } from './../../shared';

export class SubjectMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public fullName?: string,
        public initials?: string,
        public folders?: BaseEntity[],
    ) {
    }
}
