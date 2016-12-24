// module Imports
import { NgModule } from "@angular/core";
import { UniversalModule } from "angular2-universal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// pipes imports
import { ExtractFileNamePipe } from "./extract-file-name.pipe";

@NgModule({
    declarations: [
        ExtractFileNamePipe
    ],
    imports: [
        UniversalModule,
        FormsModule
    ],
    exports: [
        ExtractFileNamePipe
    ]
})
export class PipesModule {
}
