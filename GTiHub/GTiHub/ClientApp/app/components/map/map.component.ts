import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Map } from "./map";
import { MapService } from "../../services/map.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "map",
    template: require("./map.component.html"),
    providers: [MapService]
})
export class MapComponent implements OnInit, OnDestroy {
    editingMap = false;

    // Subscriptions
    editingMapSubscription: Subscription;

    constructor(private mapService: MapService) {
    }

    ngOnInit(): void {
        this.editingMapSubscription = this.mapService.getAddingOrModifyingMap()
            .subscribe(editingMap => this.editingMap = editingMap);
    }
    ngOnDestroy(): void {
        this.editingMapSubscription.unsubscribe();
    }
}