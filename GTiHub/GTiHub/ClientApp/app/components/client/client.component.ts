import { Component, OnInit, OnDestroy } from "@angular/core";
import { Client } from "./client";
import { DataService } from "../../services/data.service";
import { ClientService } from "../../services/client.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "client",
    template: require('./client.component.html'),
    providers: [DataService, ClientService]
})
export class ClientComponent implements OnInit, OnDestroy {
    private addEditClient: Client;

    //Subscriptions
    addEditClientSub: Subscription;

    onSubmit() {
        this._clientService.addClient();
    }

    newClient() {
        this._clientService.newClient();
    }

    constructor(private _dataService: DataService, private _clientService: ClientService) {
    }
    ngOnInit(): void {
        this.addEditClientSub = this._clientService.getAddEditClient().subscribe(client => this.addEditClient = client);
    }
    ngOnDestroy(): void {
        this.addEditClientSub.unsubscribe();
    }
}