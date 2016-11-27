import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { IMap } from "./map";
import { MapService } from "../../services/map.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "map",
    template: require("./map.component.html"),
    providers: [MapService]
})
export class MapComponent implements OnInit, OnDestroy {
    editingMap: boolean;

    // Subscriptions
    editingMapSubscription: Subscription;

    addMap() {
        this._mapService.setEditingMap(true);
    }

    constructor(private _mapService: MapService) {
    }

    ngOnInit(): void {
        this.editingMapSubscription = this._mapService.getAddingOrModifyingMap()
            .subscribe(editingMap => this.editingMap = editingMap);
    }
    ngOnDestroy(): void {
        this.editingMapSubscription.unsubscribe();
    }
}