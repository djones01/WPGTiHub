// module Imports
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { AppRoutingModule } from "./app-routing.module";

// third-party imports
import { FileUploadModule  } from "ng2-file-upload";
import { TextMaskModule } from 'angular2-text-mask';
import { PanelMenuModule, MenuItem } from 'primeng/primeng';

// feature module imports
import { SourceModule } from "./components/source/source.module";
import { TargetModule } from "./components/target/target.module";
import { MapModule } from "./components/map/map.module";

// service imports
import { DataService } from "./services/data/data.service";
import { UploadService } from "./services/data/file-upload.service";

// component imports
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ReactiveFormsModule, 
        SourceModule,  
        TargetModule,
        MapModule,
        TextMaskModule,
        FileUploadModule,
        AppRoutingModule,
        PanelMenuModule
    ],
    providers: [
        DataService,
        UploadService,
    ]
})
export class AppModule {
}
