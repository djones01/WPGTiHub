import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import { FilePackage } from "../components/map/run-map/filepackage";
import { Map } from "../components/map/map";

@Injectable()
export class RunMapService {
    // Array of FilePackages which will be appended to formdata
    private filePackagesSubj = new BehaviorSubject<Array<FilePackage>>([]);
    private mapsSubj = new BehaviorSubject<Array<Map>>([]);
    private selectedMapIdSubj = new BehaviorSubject<number>(null);

    // On changing selected mapping
    initFilePackages(mapId: number) {
        var filepackages = new Array<FilePackage>();
        this._dataService.GetAllWithId("Maps/MapSources", mapId)
            .subscribe(sources => {
                sources.forEach(function(source) {
                    filepackages.push(new FilePackage(false,
                        source["sourceId"],
                        source["name"],
                        source["description"],
                        true,
                        1,
                        "",
                        null));
                });
                if (filepackages.length == 1) {
                    filepackages[0].isPrimarySource = true;
                }
                this.filePackagesSubj.next(filepackages);
                this.selectedMapIdSubj.next(mapId);
            });
    }

    initMaps() {
        // Returns an object
        this._dataService.GetAll("Maps")
            .subscribe((maps: Object[]) => {
                var selectMaps = new Array<Map>();
                maps.forEach(function(map) {
                    selectMaps.push(new Map(map["description"],
                        map["effective_Date"],
                        map["active"],
                        map["transformations"],
                        map["mapId"]));
                });
                this.mapsSubj.next(selectMaps);
            });
    }

    getMaps(): Observable<Array<Map>> {
        return this.mapsSubj.asObservable();
    }

    getFilePackages(): Observable<Array<FilePackage>> {
        return this.filePackagesSubj.asObservable();
    }

    getSelectedMapId(): Observable<number> {
        return this.selectedMapIdSubj.asObservable();
    }

    constructor(private _dataService: DataService) {
        this.initMaps();
    }
}