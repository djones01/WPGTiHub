import { Component, OnInit } from "@angular/core";
import { IMap } from "./map";
import { MapService } from "../../services/map/map.service";

@Component({
    selector: "map-list",
    template: require("./map-list.component.html")
})
export class MapListComponent implements OnInit {
    maps: IMap[];

    editMap(map: IMap): void {
        this.mapService.setEditMap(map);
    }

    deleteMap(mapId: number): void {
        this.mapService.deleteMap(mapId);
    }

    constructor(private mapService: MapService) {
    }

    ngOnInit(): void {
        this.mapService.maps.subscribe(maps => this.maps = maps);
    }
}