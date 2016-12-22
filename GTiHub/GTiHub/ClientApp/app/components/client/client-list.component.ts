import { Component, OnInit, OnDestroy } from "@angular/core";
import { Client } from "./client";
import { ClientService } from "../../services/client/client.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "client-list",
    template: require('./client-list.component.html')
})
export class ClientListComponent implements OnInit {
    private clients: Client[] = [];

    edit(client: Client) {
        this.clientService.setEditClient(client);
    }

    delete(client: Client) {
        this.clientService.delete(client.clientId);
    }

    constructor(private clientService: ClientService) { }
    ngOnInit() {
        this.clientService.clients.subscribe(clients => this.clients = clients);
    }
}