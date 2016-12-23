// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// user 
import { UserEditComponent } from "./user-edit.component";

// services
import { UserService } from "../../services/user/user.service";

@NgModule({
    declarations: [
        UserEditComponent
    ],
    imports: [
        UniversalModule,
        FormsModule
    ],
    exports: [
        UserEditComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule {
}
