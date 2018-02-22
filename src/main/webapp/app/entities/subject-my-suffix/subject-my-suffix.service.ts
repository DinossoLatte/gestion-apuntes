import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SubjectMySuffix } from './subject-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubjectMySuffix>;

@Injectable()
export class SubjectMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/subjects';

    constructor(private http: HttpClient) { }

    create(subject: SubjectMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(subject);
        return this.http.post<SubjectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subject: SubjectMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(subject);
        return this.http.put<SubjectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubjectMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubjectMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubjectMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubjectMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubjectMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubjectMySuffix[]>): HttpResponse<SubjectMySuffix[]> {
        const jsonResponse: SubjectMySuffix[] = res.body;
        const body: SubjectMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubjectMySuffix.
     */
    private convertItemFromServer(subject: SubjectMySuffix): SubjectMySuffix {
        const copy: SubjectMySuffix = Object.assign({}, subject);
        return copy;
    }

    /**
     * Convert a SubjectMySuffix to a JSON which can be sent to the server.
     */
    private convert(subject: SubjectMySuffix): SubjectMySuffix {
        const copy: SubjectMySuffix = Object.assign({}, subject);
        return copy;
    }
}
