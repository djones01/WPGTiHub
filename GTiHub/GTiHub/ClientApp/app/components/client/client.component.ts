import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from "./client";
import { ClientService } from "../../services/client.service";
import { Subscription } from "rxjs/Subscription";


@Component({
    selector: "client",
    template: require('./client.component.html'),
    providers: [ClientService]
})
export class ClientComponent implements OnInit, OnDestroy {
    client: IClient;
    active: boolean = true;

    //Subscriptions
    addEditClientSub: Subscription;

    onSubmit(client: IClient) {
        this._clientService.addClient(client);
        this.reset();
    }

    reset() {
        this._clientService.newClient();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    constructor(private formBuilder: FormBuilder, private _clientService: ClientService) {
    }

    ngOnInit(): void {   
        this.addEditClientSub = this._clientService.getAddEditClient().subscribe(client => this.client = client); 
    }

    ngOnDestroy(): void {
        this.addEditClientSub.unsubscribe();
    }
}