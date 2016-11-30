import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";
import { DataService } from "./data.service";
import { IClient } from "../components/client/client";

@Injectable()
export class ClientService {
    private editing: boolean = false;
    clientsSubj = new BehaviorSubject<Array<IClient>>([]);
    addEditClientSubj = new BehaviorSubject<IClient>(null);

    addClient(client: IClient, editId?: number): void {
        if (this.editing) {
            let editIndex = this.clientsSubj.getValue().indexOf(client);
            this._dataService.Update('Clients', this.addEditClientSubj.getValue().clientId , client)
                .subscribe(() => {},
                error => console.log(error));
        } else {
            this._dataService.Add('Clients', client)
                .subscribe(client => {
                    this.clientsSubj.next(this.clientsSubj.getValue().concat(client));
                },
                error => console.log(error));
        }
        this.editing = false;
        this.newClient();
    }

    deleteClient(client: IClient): void {
        this._dataService.Delete('Clients', client.clientId)
            .subscribe(client => {
                this.removeClient(client);
            },
            error => console.log(error));
    }

    editClient(client: IClient): void {
        this.addEditClientSubj.next(client);
        this.editing = true;
    }

    removeClient(client) {
        let filtered = this.clientsSubj.getValue().filter(function (el) { return el != client });
        this.clientsSubj.next(filtered);
    }

    newClient() {
        this.addEditClientSubj.next({ name: '', industry: '' });
    }

    getAddEditClient(): Observable<IClient> {
        return this.addEditClientSubj.asObservable();
    }

    getClientsList(): Observable<IClient[]> {
        return this.clientsSubj.asObservable();
    }

    private refreshClientsList(): void {
        this._dataService.GetAll('Clients').subscribe((clients: Array<IClient>) => {
            this.clientsSubj.next(clients)
        }, error => console.log(error), () => { });
    }

    constructor(private _dataService: DataService) {
        this.refreshClientsList(); 
        this.newClient();
    }
}