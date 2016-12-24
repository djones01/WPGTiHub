import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Client } from "./client";
import { ClientService } from "../../services/client/client.service";

@Component({
    selector: "client-edit",
    template: require('./client-edit.component.html')
})
export class ClientEditComponent implements OnInit {
    clientForm: FormGroup;
    client: Client;

    onSubmit(client: Client) {
        Object.assign(this.client, client);
        this.clientService.submit(this.client);
        this.reset();
    }

    initClientForm() {
        this.clientForm = this._fb.group({
            name: [this.client.name, Validators.required],
            industry: [this.client.industry, Validators.required]
        });
    }

    reset() {
        this.clientForm.reset();
    }

    constructor(private _fb: FormBuilder, private clientService: ClientService) {
    }

    ngOnInit(): void {   
        this.clientService.editClient.subscribe(client => {
            this.client = client
            this.initClientForm();  
        });        
    }
}