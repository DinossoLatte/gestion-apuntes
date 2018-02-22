/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApuntesTestModule } from '../../../test.module';
import { DataMySuffixComponent } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix.component';
import { DataMySuffixService } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix.service';
import { DataMySuffix } from '../../../../../../main/webapp/app/entities/data-my-suffix/data-my-suffix.model';

describe('Component Tests', () => {

    describe('DataMySuffix Management Component', () => {
        let comp: DataMySuffixComponent;
        let fixture: ComponentFixture<DataMySuffixComponent>;
        let service: DataMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [DataMySuffixComponent],
                providers: [
                    DataMySuffixService
                ]
            })
            .overrideTemplate(DataMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DataMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.data[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
