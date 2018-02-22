import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FolderMySuffix } from './folder-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FolderMySuffix>;

@Injectable()
export class FolderMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/folders';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(folder: FolderMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(folder);
        return this.http.post<FolderMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(folder: FolderMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(folder);
        return this.http.put<FolderMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FolderMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FolderMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FolderMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FolderMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FolderMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FolderMySuffix[]>): HttpResponse<FolderMySuffix[]> {
        const jsonResponse: FolderMySuffix[] = res.body;
        const body: FolderMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FolderMySuffix.
     */
    private convertItemFromServer(folder: FolderMySuffix): FolderMySuffix {
        const copy: FolderMySuffix = Object.assign({}, folder);
        copy.creationDate = this.dateUtils
            .convertDateTimeFromServer(folder.creationDate);
        return copy;
    }

    /**
     * Convert a FolderMySuffix to a JSON which can be sent to the server.
     */
    private convert(folder: FolderMySuffix): FolderMySuffix {
        const copy: FolderMySuffix = Object.assign({}, folder);

        copy.creationDate = this.dateUtils.toDate(folder.creationDate);
        return copy;
    }
}
