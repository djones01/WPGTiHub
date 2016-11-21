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
            this._dataService.Update('Clients', editId , client)
                .subscribe(client => { this.getClientsList() },
                error => console.log(error));
        } else {
            this._dataService.Add('Clients', client)
                .subscribe(client => { this.getClientList() },
                error => console.log(error));
        }
        this.editing = false;
    }

    deleteClient(client: Client): void {
        this._dataService.Delete('Clients', client.clientId)
            .subscribe(client => {
                this.removeClient(client);
            },
            error => console.log(error));
    }

    updateEditClient(client: Client): void {

    }

    editClient(client: Client): void {
        this.addEditClientSubj.next(client);
        this.editing = true;
    }

    removeClient(client) {
        const index = this.clientsSubj.getValue().indexOf(client);
        this.clientsSubj.next(this.clientsSubj.getValue().splice(index, 1));
    }

    getAddEditClient(): Observable<Client> {
        return this.addEditClientSubj.asObservable();
    }

    getClientsList(): Observable<Client[]> {
        return this.clientsSubj.asObservable();
    }

    private getClientList(): void {
        this._dataService.GetAll('Clients').subscribe((clients: Array<Client>) => {
            this.clientsSubj.next(clients)
        }, error => console.log(error), () => { });
    }

    constructor(private _dataService: DataService) {
        this.getClientList(); 
    }
}