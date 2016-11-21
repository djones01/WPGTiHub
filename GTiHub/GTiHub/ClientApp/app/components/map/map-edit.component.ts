import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Response, Headers } from "@angular/http";
import { Transformation, Map } from "./map";
import { MapService } from "../../services/map.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "map-edit",
    template: require("./map.component.html")
})
export class MapEditComponent implements OnInit, OnDestroy {
    //Map which is being added or edited
    map: Map;
    //List of Transformations for the map
    transformations: Transformation[];
    //Whether or not we're editing a map currently
    editingMap: boolean;
    //Toggles whether or not to show the Transformation components
    addingTransform: boolean;
    active = true;

    //Subscriptions for map create service
    mapSubscription: Subscription;
    addingTransformSubscription: Subscription;
    mapTransformsSubscription: Subscription;
    mapHasTransformSubscription: Subscription;
    editingMapSubscription: Subscription;

    //Sets the transform for editing
    editTransform(transform: Transformation) {
        this.mapService.addingOrModifyingTransform(true);
        this.mapService.setTransform(transform, true);
    }

    //Delete a transform

    //Sets the visible component to the transform add/edit component
    addNewTransform() {
        this.mapService.addingOrModifyingTransform(true);
    }

    onSubmit() {
        this.mapService.addOrUpdateMap();
    }

    constructor(private _dataService: DataService, private mapService: MapService) {
    }

    ngOnInit(): void {
        this.addingTransformSubscription = this.mapService.getAddingOrModifyingTransform()
            .subscribe(addingTransform => this.addingTransform = addingTransform);
        this.mapTransformsSubscription = this.mapService.getMapTransforms()
            .subscribe(mapTransforms => this.transformations = mapTransforms);
        this.mapSubscription = this.mapService.getMap().subscribe(map => this.map = map);
        this.editingMapSubscription = this.mapService.getAddingOrModifyingMap()
            .subscribe(editingMap => this.editingMap = editingMap);
    }

    ngOnDestroy(): void {
        this.addingTransformSubscription.unsubscribe();
        this.mapTransformsSubscription.unsubscribe();
        this.mapSubscription.unsubscribe();
        this.editingMapSubscription.unsubscribe();
    }
}