import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { Response, Headers } from "@angular/http";
import { Transformation } from "../map";
import { Subscription } from "rxjs/Subscription";
import { MapService } from "../../../services/map.service";
import { SFieldSelectService } from "../../../services/source-select.service";
import { TFieldSelectService } from "../../../services/target-select.service";


@Component({
    selector: "transform-addedit",
    template: require("./transform.component.html"),
    providers: [SFieldSelectService, TFieldSelectService]
})
export class TransformComponent implements OnInit, OnDestroy {
    //Transformation which is currently being added or edited
    transform: Transformation;

    //Subscriptions
    transformSubscription: Subscription;

    //Toggles whether or not to show the Transformation components
    active = true;

    onSubmit() {
        //Create or update the transform currently being worked on
       // this.mapService.createOrUpdateTransform();
       // this.mapService.addingOrModifyingTransform(false);
    }

    clearTransform() {
        this.active = false;
        //this.mapService.resetTransformSubjects();
        setTimeout(() => this.active = true, 0);
    }

    cancelTransform() {
       // this.mapService.addingOrModifyingTransform(false);
       // this.mapService.resetTransformSubjects();
    }

    constructor(private _dataService: DataService, private mapService: MapService) {
    }

    ngOnInit(): void {
       // this.transformSubscription = this.mapService.getTransform()
           // .subscribe(transform => this.transform = transform);
    }

    ngOnDestroy(): void {
        this.transformSubscription.unsubscribe();
    }
}