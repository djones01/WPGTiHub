import { Component, OnInit, OnDestroy } from "@angular/core";
import { MapFileSelectComponent } from "./map-fileselect.component";
import { RunMapService } from "../../../services/map-runmap.service";
import { MapService } from "../../../services/map.service";
import { IMap } from "../map";

@Component({
    selector: "map-runmap",
    template: require("./map-runmap.component.html"),
    providers: [RunMapService]
})
export class RunMapComponent implements OnInit {
    //List of maps for map selection dropdown
    maps: IMap[];

    onMapChange(mapId: number) {
        this.runMapService.initFilePackages(mapId);
    }

    constructor(private runMapService: RunMapService, private mapService: MapService) {}

    ngOnInit() {
        this.mapService.maps.subscribe(maps => this.maps = maps);
    }
}