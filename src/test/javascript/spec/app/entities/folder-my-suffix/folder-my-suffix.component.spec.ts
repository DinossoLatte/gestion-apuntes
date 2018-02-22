/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApuntesTestModule } from '../../../test.module';
import { FolderMySuffixComponent } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix.component';
import { FolderMySuffixService } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix.service';
import { FolderMySuffix } from '../../../../../../main/webapp/app/entities/folder-my-suffix/folder-my-suffix.model';

describe('Component Tests', () => {

    describe('FolderMySuffix Management Component', () => {
        let comp: FolderMySuffixComponent;
        let fixture: ComponentFixture<FolderMySuffixComponent>;
        let service: FolderMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ApuntesTestModule],
                declarations: [FolderMySuffixComponent],
                providers: [
                    FolderMySuffixService
                ]
            })
            .overrideTemplate(FolderMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FolderMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FolderMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FolderMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.folders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
