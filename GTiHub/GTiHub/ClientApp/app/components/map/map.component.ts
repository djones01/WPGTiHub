import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { IMap } from "./map";
import { MapService } from "../../services/map.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "map",
    template: require("./map.component.html")
})
export class MapComponent {

    constructor(private _mapService: MapService) {
    }
}