// module Imports
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { Ng2PaginationModule } from "ng2-pagination";
import { FileUploadModule  } from "ng2-file-upload";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

// service imports
import { DataService } from "./services/data.service";
import { UploadService } from "./services/file-upload.service";

// component imports
import { AppComponent } from "./components/app/app.component"
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";

// client
import { ClientComponent } from "./components/client/client.component";
import { ClientListComponent } from "./components/client/client-list.component";

// source
import { SrcEditComponent } from "./components/source/src-edit.component";
import { SrcFldEditComponent } from "./components/source/srcfld-edit.component";
import { SrcListComponent } from "./components/source/selection/src-list.component";
import { SrcFldListComponent } from "./components/source/selection/srcfld-list.component";
import { SrcFldSelectComponent } from "./components/source/selection/srcfld-select.component";
    

// target
import { TgtEditComponent } from "./components/target/tgt-edit.component";
import { TgtFldEditComponent } from "./components/target/tgtfld-edit.component";
import { TgtListComponent } from "./components/target/selection/tgt-list.component";
import { TgtFldListComponent } from "./components/target/selection/tgtfld-list.component";

// map
import { MapComponent } from "./components/map/map.component";
import { MapEditComponent } from "./components/map/map-edit.component";
import { MapListComponent } from "./components/map/map-list.component";
import { RunMapComponent } from "./components/map/run-map/map-runmap.component";
import { MapFileSelectComponent } from "./components/map/run-map/map-fileselect.component";
import { TransformationEditComponent } from "./components/map/transformation/transformation-edit.component";
import { ConditionEditComponent } from "./components/map/transformation/condition/condition-edit.component";
import { RuleEditComponent } from "./components/map/transformation/rule/rule-edit.component";
import { RuleSrcFldEditComponent } from "./components/map/transformation/rule/rulesrcfld-edit.component";
import { FieldFormatComponent } from "./components/map/transformation/rule/field-format.component";
import { DateFormatComponent } from "./components/map/transformation/rule/date-format.component";


// pipes imports
import { ExtractFileNamePipe } from "./pipes/extract-file-name.pipe";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ClientComponent,
        ClientListComponent,
        SrcEditComponent,
        SrcFldEditComponent,
        SrcListComponent,
        SrcFldListComponent,
        SrcFldSelectComponent,
        TgtEditComponent,
        TgtListComponent,
        TgtFldEditComponent,
        TgtFldListComponent,
        MapComponent,
        MapEditComponent,
        MapListComponent,
        RunMapComponent,
        MapFileSelectComponent,
        TransformationEditComponent,
        ConditionEditComponent,
        RuleEditComponent,
        RuleSrcFldEditComponent,
        FieldFormatComponent,
        DateFormatComponent,
        ExtractFileNamePipe
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ReactiveFormsModule,
        Ng2PaginationModule,
        NgbModalModule.forRoot(),
        FileUploadModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'client', component: ClientComponent },
            { path: 'source', component: SrcEditComponent },
            { path: 'target', component: TgtEditComponent },
            { path: "map", component: MapComponent },
            { path: "run-map", component: RunMapComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [DataService, UploadService]
})
export class AppModule {
}
