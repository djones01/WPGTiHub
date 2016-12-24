// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjectRoutingModule } from "./project-routing.module";

// third party imports
import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';

// feature modules imports
import { SourceModule } from "../source/source.module";
import { TargetModule } from "../target/target.module";
import { MapModule } from "../map/map.module";

// project
import { ProjectOverviewComponent } from "./project-overview.component";
import { ProjectEditComponent } from "./project-edit.component";
import { ProjectListComponent } from "./project-list.component";

// services
import { ProjectService } from "../../services/project/project.service";

@NgModule({
    declarations: [
        ProjectOverviewComponent,
        ProjectEditComponent,
        ProjectListComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        ReactiveFormsModule,
        SourceModule,
        TargetModule,
        MapModule,
        ProjectRoutingModule,
        DataTableModule,
        SharedModule,
        ButtonModule,
        DialogModule
    ],
    exports: [
        ProjectOverviewComponent,
        ProjectEditComponent
    ],
    providers: [
        ProjectService
    ]
})
export class ProjectModule {
}
