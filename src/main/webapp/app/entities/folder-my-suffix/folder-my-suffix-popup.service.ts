import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FolderMySuffix } from './folder-my-suffix.model';
import { FolderMySuffixService } from './folder-my-suffix.service';

@Injectable()
export class FolderMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private folderService: FolderMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.folderService.find(id)
                    .subscribe((folderResponse: HttpResponse<FolderMySuffix>) => {
                        const folder: FolderMySuffix = folderResponse.body;
                        folder.creationDate = this.datePipe
                            .transform(folder.creationDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.folderModalRef(component, folder);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.folderModalRef(component, new FolderMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    folderModalRef(component: Component, folder: FolderMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.folder = folder;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
