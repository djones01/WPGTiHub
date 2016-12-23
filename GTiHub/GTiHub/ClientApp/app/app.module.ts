// module Imports
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { AppRoutingModule } from "./app-routing.module";

// third-party imports
import { Ng2PaginationModule } from "ng2-pagination";
import { FileUploadModule  } from "ng2-file-upload";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from 'angular2-text-mask';

// feature module imports
import { ProjectModule } from "./components/project/project.module";

// service imports
import { DataService } from "./services/data/data.service";
import { UploadService } from "./services/data/file-upload.service";

// component imports
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";

// ui elements
import { DualListComponent } from "./components/ui/dual-listbox.component";

// pipes imports
import { ExtractFileNamePipe } from "./pipes/extract-file-name.pipe";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        DualListComponent,
        ExtractFileNamePipe
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ProjectModule,
        ReactiveFormsModule,
        TextMaskModule,
        Ng2PaginationModule,
        NgbModalModule.forRoot(),
        FileUploadModule,
        AppRoutingModule
    ],
    providers: [
        DataService,
        UploadService
    ]
})
export class AppModule {
}
