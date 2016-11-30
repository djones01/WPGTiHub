import { Component, OnInit, OnDestroy } from "@angular/core";
import { IClient } from "./client";
import { ClientService } from "../../services/client.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "client-list",
    template: require('./client-list.component.html')
})
export class ClientListComponent implements OnInit, OnDestroy {
    private clients: IClient[] = [];

    //Subscriptions
    clientsSub: Subscription;

    editClient(client: IClient) {
        this._clientService.editClient(client);
    }

    deleteClient(client: IClient) {
        this._clientService.deleteClient(client);
    }

    constructor(private _clientService: ClientService) { }
    ngOnInit() {
        this.clientsSub = this._clientService.getClientsList().subscribe((clients: IClient[]) => {
            this.clients = clients;
        });
    }
    ngOnDestroy() {
        this.clientsSub.unsubscribe();
    }
}