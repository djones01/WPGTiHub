// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SrcRoutingModule } from "./source-routing.module";

// feature modules
import { PipesModule } from "../../pipes/pipes.module";

// third-party modules
import { FileUploadModule } from "ng2-file-upload";
import { Ng2PaginationModule } from "ng2-pagination";

import { DataTableModule, SharedModule, ButtonModule, DialogModule, ConfirmDialogModule, ConfirmationService, CalendarModule } from 'primeng/primeng';

// source
import { SrcEditComponent } from "./src-edit.component";
import { SrcListComponent } from "./src-list.component";
import { SrcFldEditComponent } from "./srcfld-edit.component";
import { SrcListSelectComponent } from "./selection/src-list-select.component";
import { SrcFldListComponent } from "./selection/srcfld-list.component";
import { SrcFldSelectComponent } from "./selection/srcfld-select.component";
import { SrcDualSelectComponent } from "./selection/src-dual-select.component";  

// ui elements
import { DualListComponent } from "../ui/dual-listbox.component";

// services
import { SourceService } from "../../services/source/source.service";

@NgModule({
    declarations: [
        SrcEditComponent,
        SrcListComponent,
        SrcFldEditComponent,
        SrcListSelectComponent,
        SrcFldListComponent,
        SrcFldSelectComponent,
        SrcDualSelectComponent,
        DualListComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        SrcRoutingModule,
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
        SrcEditComponent,
        SrcListComponent,
        SrcDualSelectComponent,
        SrcFldSelectComponent
    ],
    providers: [
        SourceService
    ]
})
export class SourceModule {
}
