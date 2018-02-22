/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApuntesTestModule } from '../../../test.module';
import { DataMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix-detail.component';
import { DataMySuffixService } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix.service';
import { DataMySuffix } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix.model';

describe('Component Tests', () => {

    describe('DataMySuffix Management Detail Component', () => {
        let comp: DataMySuffixDetailComponent;
        let fixture: ComponentFixture<DataMySuffixDetailComponent>;
        let service: DataMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [DataMySuffixDetailComponent],
                providers: [
                    DataMySuffixService
                ]
            })
            .overrideTemplate(DataMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DataMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.data).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
