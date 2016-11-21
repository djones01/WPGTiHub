import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from "./client";
import { ClientService } from "../../services/client.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "client",
    template: require('./client.component.html'),
    providers: [ClientService]
})
export class ClientComponent implements OnInit, OnDestroy {
    private clientForm: FormGroup;

    //Subscriptions
    addEditClientSub: Subscription;
    formChangesSub: Subscription;

    onSubmit(client: Client) {
        this._clientService.addClient(client);
        this.clientForm.reset();
    }

    reset() {
        this.clientForm.reset();
    }

    constructor(private formBuilder: FormBuilder, private _clientService: ClientService) {
    }

    ngOnInit(): void {   
        this.buildForm();
        this.addEditClientSub = this._clientService.getAddEditClient().subscribe(client => {
            if (client != null) {
                this.clientForm.patchValue(client, { onlySelf: true });
                this.formChangesSub = this.clientForm.valueChanges
                    .subscribe(x => this._clientService.updateEditClient(this.clientForm.value));
            }   
        }); 
    }

    buildForm() {
        // Build the form
        this.clientForm = this.formBuilder.group({
            name: ['', Validators.required],
            industry: ['', Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.addEditClientSub.unsubscribe();
    }
}