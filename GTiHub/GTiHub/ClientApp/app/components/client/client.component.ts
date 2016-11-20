import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private clientForm: FormGroup;
    private addEditClient: Client;

    //Subscriptions
    addEditClientSub: Subscription;

    onSubmit(client: Client) {
        this._clientService.addClient(client);
        this.clientForm.reset();
    }

    newClient() {
        this._clientService.newClient();
    }

    constructor(private formBuilder: FormBuilder, private _dataService: DataService, private _clientService: ClientService) {
    }


    ngOnInit(): void {
        this.addEditClientSub = this._clientService.getAddEditClient().subscribe(client => { this.addEditClient = client; this.buildForm(); });
        this.buildForm();
    }

    buildForm() {
        // Build the form
        this.clientForm = this.formBuilder.group({
            name: [this.addEditClient.name, <any>Validators.required],
            industry: [this.addEditClient.industry, <any>Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.addEditClientSub.unsubscribe();
    }
}