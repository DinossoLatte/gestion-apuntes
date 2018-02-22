import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApuntesSharedModule } from '../../shared';
import {
    DataMySuffixService,
    DataMySuffixPopupService,
    DataMySuffixComponent,
    DataMySuffixDetailComponent,
    DataMySuffixDialogComponent,
    DataMySuffixPopupComponent,
    DataMySuffixDeletePopupComponent,
    DataMySuffixDeleteDialogComponent,
    dataRoute,
    dataPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dataRoute,
    ...dataPopupRoute,
];

@NgModule({
    imports: [
        ApuntesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataMySuffixComponent,
        DataMySuffixDetailComponent,
        DataMySuffixDialogComponent,
        DataMySuffixDeleteDialogComponent,
        DataMySuffixPopupComponent,
        DataMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DataMySuffixComponent,
        DataMySuffixDialogComponent,
        DataMySuffixPopupComponent,
        DataMySuffixDeleteDialogComponent,
        DataMySuffixDeletePopupComponent,
    ],
    providers: [
        DataMySuffixService,
        DataMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApuntesDataMySuffixModule {}
