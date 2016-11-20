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

    addClient(): void {
        var client = this.addEditClientSubj.getValue();
        if (this.editing) {
            this._dataService.Update("Clients", client.clientId , client)
                .subscribe(client => { },
                error => console.log(error));
        } else {
            this._dataService.Add("Clients", client)
                .subscribe(client => { this.clientsSubj.next(this.clientsSubj.getValue().concat(client)) },
                error => console.log(error));
        }
        this.editing = false;
        this.newClient();
    }

    deleteClient(client: Client): void {
        this._dataService.Delete("Clients", client.clientId)
            .subscribe(client => {
                this.removeClient(client);
            },
            error => console.log(error));
    }

    editClient(client: Client): void {
        this.addEditClientSubj.next(client);
    }

    removeClient(client) {
        const index = this.clientsSubj.getValue().indexOf(client);
        this.clientsSubj.next(this.clientsSubj.getValue().splice(index, 1));
    }

    newClient(): void {
        this.addEditClientSubj.next(new Client('', ''));
    }

    getAddEditClient(): Observable<Client> {
        return this.addEditClientSubj.asObservable();
    }

    private getClientList(): void {
        this._dataService.GetAll('Clients').subscribe(clients => this.clientsSubj.next(clients), error => console.log(error), () => { });
    }

    constructor(private _dataService: DataService) {
        this.getClientList(); 
    }
}