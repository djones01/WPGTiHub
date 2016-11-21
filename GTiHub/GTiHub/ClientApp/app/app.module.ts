// Module Imports
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { Ng2PaginationModule } from "ng2-pagination";
import { FileUploadModule  } from "ng2-file-upload";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2DatetimePickerModule } from "ng2-datetime-picker";

// Service Imports
import { DataService } from "./services/data.service";

// Component Imports
import { AppComponent } from "./components/app/app.component"
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";

import { ClientComponent } from "./components/client/client.component";
import { ClientListComponent } from "./components/client/client-list.component";

import { SrcComponent } from "./components/source/src.component";
import { SrcFldComponent } from "./components/source/srcfld.component";
import { SrcListComponent } from "./components/source/selection/src-list.component";
import { SrcFldListComponent } from "./components/source/selection/srcfld-list.component";

import { TgtComponent } from "./components/target/tgt.component";
import { TgtFldComponent } from "./components/target/tgtfld.component";
import { TgtListComponent } from "./components/target/selection/tgt-list.component";
import { TgtFldListComponent } from "./components/target/selection/tgtfld-list.component";

// Pipes Imports
import { ExtractFileNamePipe } from "./pipes/extract-file-name.pipe";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ClientComponent,
        ClientListComponent,
        SrcComponent,
        SrcListComponent,
        SrcFldComponent,
        SrcFldListComponent,
        TgtComponent,
        TgtListComponent,
        TgtFldComponent,
        TgtFldListComponent,
        ExtractFileNamePipe
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        ReactiveFormsModule,
        Ng2PaginationModule,
        Ng2DatetimePickerModule,
        NgbModule.forRoot(),
        FileUploadModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'client', component: ClientComponent },
            { path: 'source', component: SrcComponent },
            { path: 'target', component: TgtComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [DataService]
})
export class AppModule {
}
