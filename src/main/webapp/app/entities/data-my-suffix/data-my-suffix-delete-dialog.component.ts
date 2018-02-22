import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataMySuffix } from './data-my-suffix.model';
import { DataMySuffixPopupService } from './data-my-suffix-popup.service';
import { DataMySuffixService } from './data-my-suffix.service';

@Component({
    selector: 'jhi-data-my-suffix-delete-dialog',
    templateUrl: './data-my-suffix-delete-dialog.component.html'
})
export class DataMySuffixDeleteDialogComponent {

    data: DataMySuffix;

    constructor(
        private dataService: DataMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataListModification',
                content: 'Deleted an data'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-my-suffix-delete-popup',
    template: ''
})
export class DataMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataPopupService: DataMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataPopupService
                .open(DataMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
