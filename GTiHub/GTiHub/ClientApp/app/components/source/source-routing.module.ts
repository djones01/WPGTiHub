import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrcEditComponent } from "./src-edit.component";
import { SrcListComponent } from "./src-list.component";

export const routes: Routes = [
    { path: "src-list", component: SrcListComponent },
    { path: "src-edit", component: SrcEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SrcRoutingModule { }
