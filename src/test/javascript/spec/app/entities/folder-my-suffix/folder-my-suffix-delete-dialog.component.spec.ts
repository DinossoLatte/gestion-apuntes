/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ApuntesTestModule } from '../../../test.module';
import { FolderMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix-delete-dialog.component';
import { FolderMySuffixService } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix.service';

describe('Component Tests', () => {

    describe('FolderMySuffix Management Delete Component', () => {
        let comp: FolderMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FolderMySuffixDeleteDialogComponent>;
        let service: FolderMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [FolderMySuffixDeleteDialogComponent],
                providers: [
                    FolderMySuffixService
                ]
            })
            .overrideTemplate(FolderMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FolderMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FolderMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
