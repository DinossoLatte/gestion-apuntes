/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ApuntesTestModule } from '../../../test.module';
import { SubjectMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix-delete-dialog.component';
import { SubjectMySuffixService } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.service';

describe('Component Tests', () => {

    describe('SubjectMySuffix Management Delete Component', () => {
        let comp: SubjectMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SubjectMySuffixDeleteDialogComponent>;
        let service: SubjectMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [SubjectMySuffixDeleteDialogComponent],
                providers: [
                    SubjectMySuffixService
                ]
            })
            .overrideTemplate(SubjectMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectMySuffixService);
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
