// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TgtRoutingModule } from "./target-routing.module";

// feature modules
import { PipesModule } from "../../pipes/pipes.module";

// third-party modules
import { FileUploadModule } from "ng2-file-upload";
import { Ng2PaginationModule } from "ng2-pagination";

import { DataTableModule, SharedModule, ButtonModule, DialogModule, ConfirmDialogModule, ConfirmationService, CalendarModule } from 'primeng/primeng';

// target
import { TgtEditComponent } from "./tgt-edit.component";
import { TgtListComponent } from "./tgt-list.component";
import { TgtFldEditComponent } from "./tgtfld-edit.component";
import { TgtFldSelectComponent } from "./selection/tgtfld-select.component";

// services
import { TargetService } from "../../services/target/target.service";

@NgModule({
    declarations: [
        TgtEditComponent,
        TgtListComponent,
        TgtFldEditComponent,
        TgtFldSelectComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        TgtRoutingModule,
        FileUploadModule,
        Ng2PaginationModule,
        PipesModule,
        CalendarModule,
        DataTableModule,
        SharedModule,
        ButtonModule,
        DialogModule,
        ConfirmDialogModule
    ],
    exports: [
        TgtEditComponent,
        TgtListComponent,
        TgtFldSelectComponent
    ],
    providers: [
        TargetService,
        ConfirmationService
    ]
})
export class TargetModule {
}
