// module Imports
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// components
import { MapOverviewComponent } from "./map-overview.component";
import { MapEditComponent } from "./map-edit.component";
import { MapListComponent } from "./map-list.component";
import { RunMapComponent } from "./run-map/map-runmap.component";
import { MapFileSelectComponent } from "./run-map/map-fileselect.component";
import { MapOptionsComponent } from "./run-map/map-options.component";
import { TransformationEditComponent } from "./transformation/transformation-edit.component";
import { ConditionEditComponent } from "./transformation/condition/condition-edit.component";
import { RuleEditComponent } from "./transformation/rule/rule-edit.component";
import { RuleSrcFldEditComponent } from "./transformation/rule/rulesrcfld-edit.component";
import { FieldFormatComponent } from "./transformation/rule/field-format.component";
import { DateFormatComponent } from "./transformation/rule/date-format.component";

// services
import { MapService } from "../../services/map/map.service";

@NgModule({
    declarations: [
        MapOverviewComponent,
        MapEditComponent,
        MapListComponent,
        RunMapComponent,
        MapFileSelectComponent,
        MapOptionsComponent,
        TransformationEditComponent,
        ConditionEditComponent,
        RuleEditComponent,
        RuleSrcFldEditComponent
    ],
    imports: [
        UniversalModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MapOverviewComponent,
        MapEditComponent,
        MapListComponent,
        RunMapComponent
    ],
    providers: [
        MapService
    ]
})
export class MapModule {
}
