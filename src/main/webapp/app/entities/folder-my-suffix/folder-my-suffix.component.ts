import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FolderMySuffix } from './folder-my-suffix.model';
import { FolderMySuffixService } from './folder-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-folder-my-suffix',
    templateUrl: './folder-my-suffix.component.html'
})
export class FolderMySuffixComponent implements OnInit, OnDestroy {
folders: FolderMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private folderService: FolderMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.folderService.query().subscribe(
            (res: HttpResponse<FolderMySuffix[]>) => {
                this.folders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFolders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FolderMySuffix) {
        return item.id;
    }
    registerChangeInFolders() {
        this.eventSubscriber = this.eventManager.subscribe('folderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
