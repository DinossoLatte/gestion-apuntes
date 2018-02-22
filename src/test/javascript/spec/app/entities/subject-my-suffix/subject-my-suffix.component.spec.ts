/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApuntesTestModule } from '../../../test.module';
import { SubjectMySuffixComponent } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.component';
import { SubjectMySuffixService } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.service';
import { SubjectMySuffix } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.model';

describe('Component Tests', () => {

    describe('SubjectMySuffix Management Component', () => {
        let comp: SubjectMySuffixComponent;
        let fixture: ComponentFixture<SubjectMySuffixComponent>;
        let service: SubjectMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [SubjectMySuffixComponent],
                providers: [
                    SubjectMySuffixService
                ]
            })
            .overrideTemplate(SubjectMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubjectMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
