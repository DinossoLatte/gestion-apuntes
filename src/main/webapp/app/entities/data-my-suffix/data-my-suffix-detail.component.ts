import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataMySuffix } from './data-my-suffix.model';
import { DataMySuffixService } from './data-my-suffix.service';

@Component({
    selector: 'jhi-data-my-suffix-detail',
    templateUrl: './data-my-suffix-detail.component.html'
})
export class DataMySuffixDetailComponent implements OnInit, OnDestroy {

    data: DataMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataService: DataMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInData();
    }

    load(id) {
        this.dataService.find(id)
            .subscribe((dataResponse: HttpResponse<DataMySuffix>) => {
                this.data = dataResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInData() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataListModification',
            (response) => this.load(this.data.id)
        );
    }
}
