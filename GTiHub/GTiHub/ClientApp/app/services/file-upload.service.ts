import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";
import { DataService } from "./data.service";

@Injectable()
export class UploadService {
    public progressObserver = new BehaviorSubject(0);

    public makeFileRequest(url: string, paramNames: string[], params: string[], files: File[]): Observable<any> {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }

        for (let i = 0; i < paramNames.length; i++) {
            formData.append(paramNames[i], params[i]);
        }

        return this._http.post(url, formData).map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || "Server Error"));
    }

    constructor(private _http: Http) { }
}