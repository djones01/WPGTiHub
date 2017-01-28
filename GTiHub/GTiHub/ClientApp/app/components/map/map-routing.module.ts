import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapEditComponent } from "./map-edit.component";
import { MapListComponent } from "./map-list.component";
import { RunMapComponent } from "./run-map/map-runmap.component";

export const routes: Routes = [
    { path: "map-list", component: MapListComponent },
    { path: "map-edit", component: MapEditComponent },
    { path: "run-maps", component: RunMapComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }
