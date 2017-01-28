import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Map, IMap } from "../../components/map/map";
import { DataService } from "../data/data.service";
import { Router } from "@angular/router";

@Injectable()
export class MapService {
    private _maps: BehaviorSubject<Map[]> = new BehaviorSubject([]);
    maps: Observable<Map[]> = this._maps.asObservable();
    private _editMap: BehaviorSubject<Map> = new BehaviorSubject(this.newMap());
    editMap: Observable<Map> = this._editMap.asObservable();

    editing: boolean = false;

    private dataStore: {
        maps: Map[]
    };

    loadall() {
        this._dataService.GetAll("Maps")
            .subscribe(maps => {
                this.dataStore.maps = maps;
                this._maps.next(this.dataStore.maps);
            }, error => console.log(error), () => { });
    }

    setEditMap(editMap: Map){ 
        // Load Transforms for the map being edited
        this._dataService.Get('Maps/GetMapTransforms', editMap.mapId)
            .subscribe(transformations => {
                editMap.transformations = transformations;
                this.router.navigate(['/map-edit']);
            },
            error => console.log(error));
        this._editMap.next(editMap);
        this.editing = true;
    }

    initEditMap() {
        this._editMap.next(this.newMap());
    }

    newMap() {
        return new Map('', new Date(), true, [])
    }

    add(map: Map) {
        this._dataService.Add('Maps', map).subscribe(newMap => {
            this.dataStore.maps.push(newMap);
            this._maps.next(this.dataStore.maps);
        }, error => console.log(error));
    }

    update(map: Map) {
        let editId = this._editMap.getValue().mapId;
        map.mapId = editId;
        this._dataService.Update('Maps', editId, map).subscribe(() => {
            this.dataStore.maps.forEach((m, i) => {
                if (m.mapId === map.mapId) { this.dataStore.maps[i] = map; }
            });
            this._maps.next(this.dataStore.maps);
        }, error => console.log(error));
        this.editing = false;
        this.initEditMap();
    }

    delete(mapId: number) {
        this._dataService.Delete('Maps', mapId).subscribe(response => {
            this.dataStore.maps.forEach((m, i) => {
                if (m.mapId === mapId) { this.dataStore.maps.splice(i, 1); }
            });
            this._maps.next(this.dataStore.maps);
        }, error => console.log(error));
    }



    constructor(private _dataService: DataService, private router: Router) {
        this.dataStore = { maps: [] };
        this.initEditMap();
        this.loadall();
    }
}