import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Map } from "./map";
import { MapService } from "../../services/map.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "map-list",
    template: require("./map-list.component.html")
})
export class MapListComponent implements OnInit, OnDestroy {
    //List of maps currently in the project
    maps: Map[];

    //Subscriptions
    mapsSubscription: Subscription;

    editMap(map: Map): void {
        this.mapService.setEditMap(map);
    }

    deleteMap(map: Map): void {
        this.mapService.deleteMap(map);
    }

    addMap(): void {
    }

    constructor(private mapService: MapService) {
    }

    ngOnInit(): void {
        this.mapsSubscription = this.mapService.getMapsList()
            .subscribe(maps => {
                this.maps = maps;
            });
    }

    ngOnDestroy(): void {
        this.mapsSubscription.unsubscribe();
    }
}