import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TgtEditComponent } from "./tgt-edit.component";
import { TgtListComponent } from "./tgt-list.component";

export const routes: Routes = [
    { path: "tgt-list", component: TgtListComponent },
    { path: "tgt-edit", component: TgtEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TgtRoutingModule { }
