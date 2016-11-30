import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http) {
        this.actionUrl = "http://localhost:50709/api/";
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }

    GetAll(action: string): Observable<any> {
        return this._http.get(this.actionUrl + action)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server Error"));
    }

    Get(action: string, id: number): Observable<any> {
        return this._http.get(this.actionUrl + action + "/" + id)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server Error"));
    }

    Add(action: string, itemToAdd: any): Observable<any> {
        return this._http.post(this.actionUrl + action, JSON.stringify(itemToAdd), { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    Update(action: string, id: number, itemToUpdate: any): Observable<any> {
        return this._http
            .put(this.actionUrl + action + "/" + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server Error"));
    }

    Delete(action: string, id: number): Observable<any> {
        return this._http.delete(this.actionUrl + action + "/" + id)
            .catch((error: any) => Observable.throw(error.json().error || "Server Error"));
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        const errMsg = (error.message)
            ? error.message
            : error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}