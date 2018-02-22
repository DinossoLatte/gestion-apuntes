import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubjectMySuffix } from './subject-my-suffix.model';
import { SubjectMySuffixService } from './subject-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-subject-my-suffix',
    templateUrl: './subject-my-suffix.component.html'
})
export class SubjectMySuffixComponent implements OnInit, OnDestroy {
subjects: SubjectMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subjectService: SubjectMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.subjectService.query().subscribe(
            (res: HttpResponse<SubjectMySuffix[]>) => {
                this.subjects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSubjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SubjectMySuffix) {
        return item.id;
    }
    registerChangeInSubjects() {
        this.eventSubscriber = this.eventManager.subscribe('subjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
