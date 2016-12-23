﻿// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// target
import { TgtOverviewComponent } from "./tgt-overview.component";
import { TgtEditComponent } from "./tgt-edit.component";
import { TgtListComponent } from "./tgt-list.component";
import { TgtFldEditComponent } from "./tgtfld-edit.component";
import { TgtListSelectComponent } from "./selection/tgt-list-select.component";
import { TgtFldListComponent } from "./selection/tgtfld-list.component";
import { TgtFldSelectComponent } from "./selection/tgtfld-select.component";

// services
import { TargetService } from "../../services/target/target.service";

@NgModule({
    declarations: [
        TgtOverviewComponent,
        TgtEditComponent,
        TgtListComponent,
        TgtFldEditComponent,
        TgtListSelectComponent,
        TgtFldListComponent,
        TgtFldSelectComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        TgtOverviewComponent,
        TgtEditComponent,
        TgtListComponent
    ],
    providers: [
        TargetService
    ]
})
export class TargetModule {
}
