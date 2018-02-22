/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ApuntesTestModule } from '../../../test.module';
import { DataMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix-delete-dialog.component';
import { DataMySuffixService } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix.service';

describe('Component Tests', () => {

    describe('DataMySuffix Management Delete Component', () => {
        let comp: DataMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DataMySuffixDeleteDialogComponent>;
        let service: DataMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [DataMySuffixDeleteDialogComponent],
                providers: [
                    DataMySuffixService
                ]
            })
            .overrideTemplate(DataMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataMySuffixService);
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
