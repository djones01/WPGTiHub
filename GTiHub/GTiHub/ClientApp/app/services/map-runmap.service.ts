import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import { FilePackage } from "../components/map/run-map/filepackage";
import { IMap } from "../components/map/map";

@Injectable()
export class RunMapService {
    // Array of FilePackages which will be appended to formdata
    private _filePackages = new BehaviorSubject<FilePackage[]>([]);
    filePackages: Observable<FilePackage[]> = this._filePackages.asObservable();
    
    private _selectedMapId = new BehaviorSubject<number>(null);
    selectedMapId: Observable<number> = this._selectedMapId.asObservable(); 

    // On changing selected mapping
    initFilePackages(mapId: number) {
        var filepackages = new Array<FilePackage>();
        this._dataService.Get("Maps/MapSources", mapId)
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
                this._filePackages.next(filepackages);
                this._selectedMapId.next(mapId);
            });
    }

    constructor(private _dataService: DataService) {}
}