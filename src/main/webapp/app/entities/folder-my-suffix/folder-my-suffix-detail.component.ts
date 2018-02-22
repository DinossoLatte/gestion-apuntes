import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FolderMySuffix } from './folder-my-suffix.model';
import { FolderMySuffixService } from './folder-my-suffix.service';

@Component({
    selector: 'jhi-folder-my-suffix-detail',
    templateUrl: './folder-my-suffix-detail.component.html'
})
export class FolderMySuffixDetailComponent implements OnInit, OnDestroy {

    folder: FolderMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private folderService: FolderMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFolders();
    }

    load(id) {
        this.folderService.find(id)
            .subscribe((folderResponse: HttpResponse<FolderMySuffix>) => {
                this.folder = folderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFolders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'folderListModification',
            (response) => this.load(this.folder.id)
        );
    }
}
