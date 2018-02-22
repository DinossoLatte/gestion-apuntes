import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DataMySuffix } from './data-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DataMySuffix>;

@Injectable()
export class DataMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/data';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(data: DataMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(data);
        return this.http.post<DataMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(data: DataMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(data);
        return this.http.put<DataMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DataMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DataMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DataMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DataMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DataMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DataMySuffix[]>): HttpResponse<DataMySuffix[]> {
        const jsonResponse: DataMySuffix[] = res.body;
        const body: DataMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DataMySuffix.
     */
    private convertItemFromServer(data: DataMySuffix): DataMySuffix {
        const copy: DataMySuffix = Object.assign({}, data);
        copy.creationDate = this.dateUtils
            .convertDateTimeFromServer(data.creationDate);
        return copy;
    }

    /**
     * Convert a DataMySuffix to a JSON which can be sent to the server.
     */
    private convert(data: DataMySuffix): DataMySuffix {
        const copy: DataMySuffix = Object.assign({}, data);

        copy.creationDate = this.dateUtils.toDate(data.creationDate);
        return copy;
    }
}
