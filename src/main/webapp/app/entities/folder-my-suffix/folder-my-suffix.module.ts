import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApuntesSharedModule } from '../../shared';
import {
    FolderMySuffixService,
    FolderMySuffixPopupService,
    FolderMySuffixComponent,
    FolderMySuffixDetailComponent,
    FolderMySuffixDialogComponent,
    FolderMySuffixPopupComponent,
    FolderMySuffixDeletePopupComponent,
    FolderMySuffixDeleteDialogComponent,
    folderRoute,
    folderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...folderRoute,
    ...folderPopupRoute,
];

@NgModule({
    imports: [
        ApuntesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FolderMySuffixComponent,
        FolderMySuffixDetailComponent,
        FolderMySuffixDialogComponent,
        FolderMySuffixDeleteDialogComponent,
        FolderMySuffixPopupComponent,
        FolderMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FolderMySuffixComponent,
        FolderMySuffixDialogComponent,
        FolderMySuffixPopupComponent,
        FolderMySuffixDeleteDialogComponent,
        FolderMySuffixDeletePopupComponent,
    ],
    providers: [
        FolderMySuffixService,
        FolderMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApuntesFolderMySuffixModule {}
