import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";
import { DataService } from "./data.service";
import { Client } from "../components/client/client";

@Injectable()
export class ClientService {
    private editing: boolean = false;
    clientsSubj = new BehaviorSubject<Array<Client>>([]);
    addEditClientSubj = new BehaviorSubject<Client>(null);

    addClient(client: Client, editId?: number): void {
        if (this.editing) {
            let editIndex = this.clientsSubj.getValue().indexOf(client);
            this._dataService.Update('Clients', this.addEditClientSubj.getValue().clientId , this.addEditClientSubj.getValue())
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

    deleteClient(client: Client): void {
        this._dataService.Delete('Clients', client.clientId)
            .subscribe(client => {
                this.removeClient(client);
            },
            error => console.log(error));
    }

    editClient(client: Client): void {
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

    getAddEditClient(): Observable<Client> {
        return this.addEditClientSubj.asObservable();
    }

    getClientsList(): Observable<Client[]> {
        return this.clientsSubj.asObservable();
    }

    private refreshClientsList(): void {
        this._dataService.GetAll('Clients').subscribe((clients: Array<Client>) => {
            this.clientsSubj.next(clients)
        }, error => console.log(error), () => { });
    }

    constructor(private _dataService: DataService) {
        this.refreshClientsList(); 
        this.newClient();
    }
}