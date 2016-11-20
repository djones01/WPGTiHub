import { Component, OnInit, OnDestroy } from "@angular/core";
import { Client } from "./client";
import { DataService } from "../../services/data.service";
import { ClientService } from "../../services/client.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "client-list",
    template: require('./client-list.component.html')
})
export class ClientListComponent implements OnInit, OnDestroy {
    private clients: Client[] = [];

    //Subscriptions
    clientsSub: Subscription;

    editClient(client: Client) {
        this._clientService.editClient(client);
    }

    deleteClient(client: Client) {
        this._clientService.deleteClient(client);
    }

    constructor(private _dataService: DataService, private _clientService: ClientService) { }
    ngOnInit() {
        this.clientsSub = this._dataService.GetAll('Clients').subscribe(clients => this.clients = clients, error => console.log(error), () => { });
    }
    ngOnDestroy() {
        this.clientsSub.unsubscribe();
    }
}