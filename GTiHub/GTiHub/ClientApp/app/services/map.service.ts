import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { IMap } from "../components/map/map";
import { DataService } from "./data.service";

@Injectable()
export class MapService {
    maps: Observable<IMap[]>;
    private _maps: BehaviorSubject<IMap[]>;
    editMap: Observable<IMap>;
    private _editMap: BehaviorSubject<IMap>;

    private dataStore: {
        maps: IMap[],
        editMap: IMap
    };

    loadall() {
        this._dataService.GetAll("Maps")
            .subscribe(maps => {
                this.dataStore.maps = maps;
                this._maps.next(this.dataStore.maps);
            }, error => console.log(error), () => { });
    }

    setEditMap(editMap: IMap) {
        this.dataStore.editMap = editMap;
        // Load Transforms for the map being edited
        this._dataService.Get('Maps/GetMapTransforms', editMap.mapId)
            .subscribe(transformations => this.dataStore.editMap.transformations = transformations,
            error => console.log(error));
        this._editMap.next(editMap);
    }

    clearEditMap() {
        this.dataStore.editMap = { description: '', effective_Date: new Date(), active: true, transformations: [] };
        this._editMap.next(this.dataStore.editMap);
    }

    add(map: IMap) {
        this._dataService.Add('Maps', map).subscribe(map => {
            this.dataStore.maps.push(map);
            this._maps.next(this.dataStore.maps);
        }, error => console.log(error));
    }

    update(map: IMap) {
        this._dataService.Update('Maps', map.mapId, map).subscribe((map: IMap) => {
            this.dataStore.maps.forEach((m, i) => {
                if (m.mapId === map.mapId) { this.dataStore.maps[i] = map; }
            });
            this._maps.next(this.dataStore.maps);
        }, error => console.log(error));
    }

    deleteMap(mapId: number) {
        this._dataService.Delete('Maps', mapId).subscribe(response => {
            this.dataStore.maps.forEach((m, i) => {
                if (m.mapId === mapId) { this.dataStore.maps.splice(i, 1); }
            });
            this._maps.next(this.dataStore.maps);
        }, error => console.log(error));
    }

    constructor(private _dataService: DataService) {
        this.dataStore = { maps: [], editMap: { description: '', effective_Date: new Date(), active: true, transformations: [] }};
        this._maps = <BehaviorSubject<IMap[]>>new BehaviorSubject([]);
        this._editMap = <BehaviorSubject<IMap>>new BehaviorSubject(this.dataStore.editMap);
        this.maps = this._maps.asObservable();
        this.editMap = this._editMap.asObservable();
        // Get the list of maps
        this.loadall();
    }
}