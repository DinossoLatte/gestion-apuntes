import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataMySuffix } from './data-my-suffix.model';
import { DataMySuffixPopupService } from './data-my-suffix-popup.service';
import { DataMySuffixService } from './data-my-suffix.service';
import { FolderMySuffix, FolderMySuffixService } from '../folder-my-suffix';

@Component({
    selector: 'jhi-data-my-suffix-dialog',
    templateUrl: './data-my-suffix-dialog.component.html'
})
export class DataMySuffixDialogComponent implements OnInit {

    data: DataMySuffix;
    isSaving: boolean;

    folders: FolderMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dataService: DataMySuffixService,
        private folderService: FolderMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.folderService.query()
            .subscribe((res: HttpResponse<FolderMySuffix[]>) => { this.folders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.data.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataService.update(this.data));
        } else {
            this.subscribeToSaveResponse(
                this.dataService.create(this.data));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DataMySuffix>>) {
        result.subscribe((res: HttpResponse<DataMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DataMySuffix) {
        this.eventManager.broadcast({ name: 'dataListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFolderById(index: number, item: FolderMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-data-my-suffix-popup',
    template: ''
})
export class DataMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataPopupService: DataMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataPopupService
                    .open(DataMySuffixDialogComponent as Component, params['id']);
            } else {
                this.dataPopupService
                    .open(DataMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
