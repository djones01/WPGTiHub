import { Component, OnInit, OnDestroy } from "@angular/core";
import { Client } from "./client";
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

    constructor(private _clientService: ClientService) { }
    ngOnInit() {
        this.clientsSub = this._clientService.getClientsList().subscribe((clients: Client[]) => {
            this.clients = clients;
        });
    }
    ngOnDestroy() {
        this.clientsSub.unsubscribe();
    }
}