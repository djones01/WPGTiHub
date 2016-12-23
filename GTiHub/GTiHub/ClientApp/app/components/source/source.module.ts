// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// source
import { SrcOverviewComponent } from "./src-overview.component";
import { SrcEditComponent } from "./src-edit.component";
import { SrcListComponent } from "./src-list.component";
import { SrcFldEditComponent } from "./srcfld-edit.component";
import { SrcListSelectComponent } from "./selection/src-list-select.component";
import { SrcFldListComponent } from "./selection/srcfld-list.component";
import { SrcFldSelectComponent } from "./selection/srcfld-select.component";
import { SrcDualSelectComponent } from "./selection/src-dual-select.component";  

// services
import { SourceService } from "../../services/source/source.service";

@NgModule({
    declarations: [
        SrcOverviewComponent,
        SrcEditComponent,
        SrcListComponent,
        SrcFldEditComponent,
        SrcListSelectComponent,
        SrcFldListComponent,
        SrcFldSelectComponent,
        SrcDualSelectComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SrcOverviewComponent,
        SrcEditComponent,
        SrcListComponent,
        SrcDualSelectComponent
    ],
    providers: [
        SourceService
    ]
})
export class SourceModule {
}
