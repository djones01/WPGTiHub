import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Map } from "./map";
import { MapService } from "../../services/map/map.service";
import { Subscription } from "rxjs/Subscription";
import { ConfirmationService } from "primeng/primeng";

@Component({
    selector: "map-list",
    template: require('./map-list.component.html')
})
export class MapListComponent implements OnInit {
    private showDialog = false;
    private canDelete = false;
    private canEdit = false;
    private maps: Map[];
    private selectedMaps: Map[] = [];

    editMap() {
        this.mapService.setEditMap(this.selectedMaps[0]);
        this.router.navigateByUrl('/map-edit');
    }

    deleteMaps() {
        this.confirmationService.confirm({
            message: "Are you sure that you wish to delete the selected map(s)?",
            accept: () => {
                this.selectedMaps.forEach((c, i) => {
                    this.mapService.delete(c.mapId);
                });
                this.selectedMaps = [];
            }
        });
        this.canDelete = false;
        this.canEdit = false;
    }

    //Update the state of the delete and edit buttons based on row selection
    onRowSelect(event) {
        if (this.selectedMaps.length > 1) {
            this.canEdit = false;
        }
        else {
            this.canDelete = true;
            this.canEdit = true;
        }
    }
    onRowUnselect(event) {
        if (this.selectedMaps.length == 1) {
            this.canEdit = true;
        }
        if (this.selectedMaps.length == 0) {
            this.canDelete = false;
            this.canEdit = false;
        }
    }

    constructor(private confirmationService: ConfirmationService, private router: Router, private mapService: MapService) { }
    ngOnInit() {
        this.mapService.maps.subscribe(maps => this.maps = maps);
    }
}