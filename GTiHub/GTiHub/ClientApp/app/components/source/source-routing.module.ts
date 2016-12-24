import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrcEditComponent } from "./src-edit.component";

export const routes: Routes = [
    { path: "source-edit", component: SrcEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SrcRoutingModule { }
