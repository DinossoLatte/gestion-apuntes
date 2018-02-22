import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataMySuffix } from './data-my-suffix.model';
import { DataMySuffixService } from './data-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-data-my-suffix',
    templateUrl: './data-my-suffix.component.html'
})
export class DataMySuffixComponent implements OnInit, OnDestroy {
data: DataMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dataService: DataMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dataService.query().subscribe(
            (res: HttpResponse<DataMySuffix[]>) => {
                this.data = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInData();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DataMySuffix) {
        return item.id;
    }
    registerChangeInData() {
        this.eventSubscriber = this.eventManager.subscribe('dataListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
