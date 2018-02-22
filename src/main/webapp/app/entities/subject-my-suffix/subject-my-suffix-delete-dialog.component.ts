import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubjectMySuffix } from './subject-my-suffix.model';
import { SubjectMySuffixPopupService } from './subject-my-suffix-popup.service';
import { SubjectMySuffixService } from './subject-my-suffix.service';

@Component({
    selector: 'jhi-subject-my-suffix-delete-dialog',
    templateUrl: './subject-my-suffix-delete-dialog.component.html'
})
export class SubjectMySuffixDeleteDialogComponent {

    subject: SubjectMySuffix;

    constructor(
        private subjectService: SubjectMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subjectListModification',
                content: 'Deleted an subject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subject-my-suffix-delete-popup',
    template: ''
})
export class SubjectMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subjectPopupService: SubjectMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subjectPopupService
                .open(SubjectMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
