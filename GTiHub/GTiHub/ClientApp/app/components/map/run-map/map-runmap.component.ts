import { Component, OnInit, OnDestroy } from "@angular/core";
import { MapFileSelectComponent } from "./map-fileselect.component";
import { RunMapService } from "../../../services/map-runmap.service";
import { Subscription } from "rxjs/Subscription";
import { Map } from "../map";

@Component({
    selector: "map-runmap",
    template: require("./map-runmap.component.html"),
    providers: [RunMapService]
})
export class RunMapComponent implements OnInit, OnDestroy {
    //List of maps for map selection dropdown
    maps: Map[];

    //Subscriptions
    mapSubscription: Subscription;

    onMapChange(mapId: number) {
        this.runMapService.initFilePackages(mapId);
    }

    constructor(private runMapService: RunMapService) {}

    ngOnInit() {
        this.mapSubscription = this.runMapService.getMaps().subscribe(maps => this.maps = maps);
    }

    ngOnDestroy() {
        this.mapSubscription.unsubscribe();
    }
}