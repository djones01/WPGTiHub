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
import { SrcFldSelectComponent } from "./selection/srcfld-select.component";

// services
import { SourceService } from "../../services/source/source.service";

@NgModule({
    declarations: [
        SrcEditComponent,
        SrcListComponent,
        SrcFldEditComponent,
        SrcFldSelectComponent
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
        SrcFldSelectComponent
    ],
    providers: [
        SourceService,
        ConfirmationService
    ]
})
export class SourceModule {
}
