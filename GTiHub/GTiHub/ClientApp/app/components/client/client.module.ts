// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientRoutingModule } from "./client-routing.module";

// third party imports
import { DataTableModule, SharedModule, ButtonModule, DialogModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

// components
import { ClientEditComponent } from "./client-edit.component";
import { ClientListComponent } from "./client-list.component";

// services
import { ClientService } from "../../services/client/client.service";

@NgModule({
    declarations: [
        ClientEditComponent,
        ClientListComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        ReactiveFormsModule,
        ClientRoutingModule,        
        DataTableModule,
        SharedModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule
    ],
    exports: [
        ClientEditComponent,
        ClientListComponent
    ],
    providers: [
        ClientService,
        ConfirmationService
    ]
})
export class ClientModule {
}
