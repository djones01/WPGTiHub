// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
        FormsModule
    ],
    exports: [
        ClientEditComponent,
        ClientListComponent
    ],
    providers: [
        ClientService
    ]
})
export class ClientModule {
}
