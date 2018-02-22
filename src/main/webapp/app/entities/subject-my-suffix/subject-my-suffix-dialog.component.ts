import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubjectMySuffix } from './subject-my-suffix.model';
import { SubjectMySuffixPopupService } from './subject-my-suffix-popup.service';
import { SubjectMySuffixService } from './subject-my-suffix.service';

@Component({
    selector: 'jhi-subject-my-suffix-dialog',
    templateUrl: './subject-my-suffix-dialog.component.html'
})
export class SubjectMySuffixDialogComponent implements OnInit {

    subject: SubjectMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private subjectService: SubjectMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subjectService.update(this.subject));
        } else {
            this.subscribeToSaveResponse(
                this.subjectService.create(this.subject));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubjectMySuffix>>) {
        result.subscribe((res: HttpResponse<SubjectMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubjectMySuffix) {
        this.eventManager.broadcast({ name: 'subjectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-subject-my-suffix-popup',
    template: ''
})
export class SubjectMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subjectPopupService: SubjectMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subjectPopupService
                    .open(SubjectMySuffixDialogComponent as Component, params['id']);
            } else {
                this.subjectPopupService
                    .open(SubjectMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
