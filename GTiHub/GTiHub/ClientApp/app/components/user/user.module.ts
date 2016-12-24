// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";

// third party imports
import { DataTableModule, SharedModule, ButtonModule, DialogModule, ConfirmDialogModule, ConfirmationService, MultiSelectModule } from 'primeng/primeng';
import { TextMaskModule } from 'angular2-text-mask';

// user 
import { UserEditComponent } from "./user-edit.component";
import { UserListComponent } from "./user-list.component";

// services
import { UserService } from "../../services/user/user.service";

@NgModule({
    declarations: [
        UserEditComponent,
        UserListComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
        DataTableModule,
        SharedModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule,
        MultiSelectModule,
        TextMaskModule
    ],
    exports: [
        UserEditComponent
    ],
    providers: [
        UserService,
        ConfirmationService
    ]
})
export class UserModule {
}
