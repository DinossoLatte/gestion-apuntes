import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FolderMySuffix } from './folder-my-suffix.model';
import { FolderMySuffixPopupService } from './folder-my-suffix-popup.service';
import { FolderMySuffixService } from './folder-my-suffix.service';
import { SubjectMySuffix, SubjectMySuffixService } from '../subject-my-suffix';

@Component({
    selector: 'jhi-folder-my-suffix-dialog',
    templateUrl: './folder-my-suffix-dialog.component.html'
})
export class FolderMySuffixDialogComponent implements OnInit {

    folder: FolderMySuffix;
    isSaving: boolean;

    subjects: SubjectMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private folderService: FolderMySuffixService,
        private subjectService: SubjectMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subjectService.query()
            .subscribe((res: HttpResponse<SubjectMySuffix[]>) => { this.subjects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.folder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.folderService.update(this.folder));
        } else {
            this.subscribeToSaveResponse(
                this.folderService.create(this.folder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FolderMySuffix>>) {
        result.subscribe((res: HttpResponse<FolderMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FolderMySuffix) {
        this.eventManager.broadcast({ name: 'folderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSubjectById(index: number, item: SubjectMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-folder-my-suffix-popup',
    template: ''
})
export class FolderMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private folderPopupService: FolderMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.folderPopupService
                    .open(FolderMySuffixDialogComponent as Component, params['id']);
            } else {
                this.folderPopupService
                    .open(FolderMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
