import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FolderMySuffix } from './folder-my-suffix.model';
import { FolderMySuffixPopupService } from './folder-my-suffix-popup.service';
import { FolderMySuffixService } from './folder-my-suffix.service';

@Component({
    selector: 'jhi-folder-my-suffix-delete-dialog',
    templateUrl: './folder-my-suffix-delete-dialog.component.html'
})
export class FolderMySuffixDeleteDialogComponent {

    folder: FolderMySuffix;

    constructor(
        private folderService: FolderMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.folderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'folderListModification',
                content: 'Deleted an folder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-folder-my-suffix-delete-popup',
    template: ''
})
export class FolderMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private folderPopupService: FolderMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.folderPopupService
                .open(FolderMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
