import { Component, OnInit, OnDestroy } from "@angular/core";
import { Client } from "./client";
import { ClientService } from "../../services/client/client.service";

@Component({
    selector: "client-edit",
    template: require('./client-edit.component.html')
})
export class ClientEditComponent implements OnInit {
    client: Client;
    active: boolean = true;

    onSubmit(client: Client) {
        this.clientService.submit(client);
        this.reset();
    }

    reset() {
        this.clientService.initEditClient();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    constructor(private clientService: ClientService) {
    }

    ngOnInit(): void {   
        this.clientService.editClient.subscribe(client => this.client = client);
    }
}