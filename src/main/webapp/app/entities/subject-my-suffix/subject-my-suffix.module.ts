import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApuntesSharedModule } from '../../shared';
import {
    SubjectMySuffixService,
    SubjectMySuffixPopupService,
    SubjectMySuffixComponent,
    SubjectMySuffixDetailComponent,
    SubjectMySuffixDialogComponent,
    SubjectMySuffixPopupComponent,
    SubjectMySuffixDeletePopupComponent,
    SubjectMySuffixDeleteDialogComponent,
    subjectRoute,
    subjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subjectRoute,
    ...subjectPopupRoute,
];

@NgModule({
    imports: [
        ApuntesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SubjectMySuffixComponent,
        SubjectMySuffixDetailComponent,
        SubjectMySuffixDialogComponent,
        SubjectMySuffixDeleteDialogComponent,
        SubjectMySuffixPopupComponent,
        SubjectMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SubjectMySuffixComponent,
        SubjectMySuffixDialogComponent,
        SubjectMySuffixPopupComponent,
        SubjectMySuffixDeleteDialogComponent,
        SubjectMySuffixDeletePopupComponent,
    ],
    providers: [
        SubjectMySuffixService,
        SubjectMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApuntesSubjectMySuffixModule {}
