// module Imports
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { Ng2PaginationModule } from "ng2-pagination";
import { FileUploadModule  } from "ng2-file-upload";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from 'angular2-text-mask';

// service imports
import { ClientService } from "./services/client/client.service";
import { DataService } from "./services/data/data.service";
import { MapService } from "./services/map/map.service";
import { SourceService } from "./services/source/source.service";
import { TargetService } from "./services/target/target.service";
import { UploadService } from "./services/data/file-upload.service";
import { UserService } from "./services/user/user.service";


// component imports
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";

// client
import { ClientEditComponent } from "./components/client/client-edit.component";
import { ClientListComponent } from "./components/client/client-list.component";

// source
import { SrcComponent } from "./components/source/src.component";
import { SrcEditComponent } from "./components/source/src-edit.component";
import { SrcListComponent } from "./components/source/src-list.component";
import { SrcFldEditComponent } from "./components/source/srcfld-edit.component";
import { SrcListSelectComponent } from "./components/source/selection/src-list-select.component";
import { SrcFldListComponent } from "./components/source/selection/srcfld-list.component";
import { SrcFldSelectComponent } from "./components/source/selection/srcfld-select.component";    

// target
import { TgtComponent } from "./components/target/tgt.component";
import { TgtEditComponent } from "./components/target/tgt-edit.component";
import { TgtListComponent } from "./components/target/tgt-list.component";
import { TgtFldEditComponent } from "./components/target/tgtfld-edit.component";
import { TgtListSelectComponent } from "./components/target/selection/tgt-list-select.component";
import { TgtFldListComponent } from "./components/target/selection/tgtfld-list.component";
import { TgtFldSelectComponent } from "./components/target/selection/tgtfld-select.component";

// map
import { MapComponent } from "./components/map/map.component";
import { MapEditComponent } from "./components/map/map-edit.component";
import { MapListComponent } from "./components/map/map-list.component";
import { RunMapComponent } from "./components/map/run-map/map-runmap.component";
import { MapFileSelectComponent } from "./components/map/run-map/map-fileselect.component";
import { MapOptionsComponent } from "./components/map/run-map/map-options.component";
import { TransformationEditComponent } from "./components/map/transformation/transformation-edit.component";
import { ConditionEditComponent } from "./components/map/transformation/condition/condition-edit.component";
import { RuleEditComponent } from "./components/map/transformation/rule/rule-edit.component";
import { RuleSrcFldEditComponent } from "./components/map/transformation/rule/rulesrcfld-edit.component";
import { FieldFormatComponent } from "./components/map/transformation/rule/field-format.component";
import { DateFormatComponent } from "./components/map/transformation/rule/date-format.component";

// project
import { ProjOverviewComponent } from "./components/project/proj-overview.component";
import { ProjectEditComponent } from "./components/project/project-edit.component";

// ui elements
import { DualListComponent } from "./components/ui/dual-listbox.component";

// user 
import { UserEditComponent } from "./components/user/user-edit.component";

// pipes imports
import { ExtractFileNamePipe } from "./pipes/extract-file-name.pipe";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ClientEditComponent,
        ClientListComponent,
        SrcComponent,
        SrcEditComponent,
        SrcListComponent,
        SrcFldEditComponent,
        SrcListSelectComponent,
        SrcFldListComponent,
        SrcFldSelectComponent,
        TgtComponent,
        TgtEditComponent,
        TgtListComponent,
        TgtListSelectComponent,
        TgtFldEditComponent,
        TgtFldListComponent,
        TgtFldSelectComponent,
        MapComponent,
        MapEditComponent,
        MapListComponent,
        RunMapComponent,
        MapFileSelectComponent,
        MapOptionsComponent,
        TransformationEditComponent,
        ConditionEditComponent,
        RuleEditComponent,
        RuleSrcFldEditComponent,
        ProjOverviewComponent,
        ProjectEditComponent,
        UserEditComponent,
        FieldFormatComponent,
        DateFormatComponent,
        DualListComponent,
        ExtractFileNamePipe
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        Ng2PaginationModule,
        NgbModalModule.forRoot(),
        FileUploadModule,
        RouterModule.forRoot([
            { path: "", redirectTo: "proj-overview", pathMatch: "full" },
            { path: "home", component: ProjOverviewComponent },
            { path: "client", component: ClientEditComponent },
            { path: "src-edit", component: SrcEditComponent },
            { path: "tgt-edit", component: TgtEditComponent },
            { path: "map-edit", component: MapEditComponent },
            { path: "project-edit", component: ProjectEditComponent }, 
            { path: "user-edit", component: UserEditComponent }, 
            { path: "proj-overview", component: ProjOverviewComponent },
            { path: "run-map", component: RunMapComponent },
            { path: "**", redirectTo: "proj-overview" }
        ])
    ],
    providers: [
        DataService,
        UploadService,
        MapService,
        TargetService,
        SourceService,
        ClientService,
        UserService
    ]
})
export class AppModule {
}
