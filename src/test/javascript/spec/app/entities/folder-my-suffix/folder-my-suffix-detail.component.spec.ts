/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApuntesTestModule } from '../../../test.module';
import { FolderMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix-detail.component';
import { FolderMySuffixService } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix.service';
import { FolderMySuffix } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix.model';

describe('Component Tests', () => {

    describe('FolderMySuffix Management Detail Component', () => {
        let comp: FolderMySuffixDetailComponent;
        let fixture: ComponentFixture<FolderMySuffixDetailComponent>;
        let service: FolderMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [FolderMySuffixDetailComponent],
                providers: [
                    FolderMySuffixService
                ]
            })
            .overrideTemplate(FolderMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FolderMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FolderMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FolderMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.folder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
