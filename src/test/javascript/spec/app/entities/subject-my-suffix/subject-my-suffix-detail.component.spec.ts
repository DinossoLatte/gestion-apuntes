/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApuntesTestModule } from '../../../test.module';
import { SubjectMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix-detail.component';
import { SubjectMySuffixService } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.service';
import { SubjectMySuffix } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.model';

describe('Component Tests', () => {

    describe('SubjectMySuffix Management Detail Component', () => {
        let comp: SubjectMySuffixDetailComponent;
        let fixture: ComponentFixture<SubjectMySuffixDetailComponent>;
        let service: SubjectMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [SubjectMySuffixDetailComponent],
                providers: [
                    SubjectMySuffixService
                ]
            })
            .overrideTemplate(SubjectMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SubjectMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subject).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
