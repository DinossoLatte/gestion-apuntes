import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ApuntesSubjectMySuffixModule } from './subject-my-suffix/subject-my-suffix.module';
import { ApuntesFolderMySuffixModule } from './folder-my-suffix/folder-my-suffix.module';
import { ApuntesDataMySuffixModule } from './data-my-suffix/data-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ApuntesSubjectMySuffixModule,
        ApuntesFolderMySuffixModule,
        ApuntesDataMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApuntesEntityModule {}
