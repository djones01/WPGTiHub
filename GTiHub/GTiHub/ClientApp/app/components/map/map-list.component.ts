import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { IMap } from "./map";
import { MapService } from "../../services/map.service";

@Component({
    selector: "map-list",
    template: require("./map-list.component.html")
})
export class MapListComponent implements OnInit, OnDestroy {
    maps: IMap[];

    editMap(map: IMap): void {
        this.mapService.setEditMap(map);
        this.router.navigate(['/map-edit']);
    }

    deleteMap(mapId: number): void {
        this.mapService.deleteMap(mapId);
    }

    constructor(private mapService: MapService, private router: Router) {
    }

    ngOnInit(): void {
        this.mapService.maps.subscribe(maps => this.maps = maps);
    }

    ngOnDestroy(): void {
  
    }
}