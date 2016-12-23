// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// project
import { ProjectOverviewComponent } from "./project-overview.component";
import { ProjectEditComponent } from "./project-edit.component";

// services
import { ProjectService } from "../../services/project/project.service";

@NgModule({
    declarations: [
        ProjectOverviewComponent,
        ProjectEditComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        ReactiveFormsModule
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
