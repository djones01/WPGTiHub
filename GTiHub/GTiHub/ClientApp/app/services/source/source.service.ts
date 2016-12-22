import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Source, SourceField } from "../../components/source/source";
import { DataService } from "../data/data.service";

@Injectable()
export class SourceService {
    private _sources: BehaviorSubject<Source[]> = new BehaviorSubject([]);
    sources: Observable<Source[]> = this._sources.asObservable();
    private _editSource: BehaviorSubject<Source> = new BehaviorSubject(null);
    editSource: Observable<Source> = this._editSource.asObservable();

    private dataStore: {
        sources: Source[]
    };

    loadall() {
        this._dataService.GetAll("Sources")
            .subscribe(sources => {
                this.dataStore.sources = sources;
                this._sources.next(this.dataStore.sources);
            }, error => console.log(error), () => { });
    }

    getSourceFields(sourceId: number): Observable<SourceField[]> {
        return this._dataService.Get("Sources/GetSourceFieldsbySource", sourceId);
    }

    setEditSource(edit: Source) {
        // Filter source fields for the source being edited
        this.getSourceFields(edit.sourceId)
            .subscribe(sourceFields => {
                edit.sourceFields = sourceFields;
                this._editSource.next(edit);
            },
            error => console.log(error));
    }

    clearEditSource() {
        this._editSource.next(null);
    }

    add(source: Source) {
        this._dataService.Add('Sources', source).subscribe(source => {
            this.dataStore.sources.push(source);
            this._sources.next(this.dataStore.sources);
        }, error => console.log(error));
    }

    update(source: Source) {
        this._dataService.Update('Sources', source.sourceId, source).subscribe((source: Source) => {
            this.dataStore.sources.forEach((m, i) => {
                if (m.sourceId === source.sourceId) { this.dataStore.sources[i] = source; }
            });
            this._sources.next(this.dataStore.sources);
        }, error => console.log(error));
    }

    delete(sourceId: number) {
        this._dataService.Delete('Sources', sourceId).subscribe(response => {
            this.dataStore.sources.forEach((m, i) => {
                if (m.sourceId === sourceId) { this.dataStore.sources.splice(i, 1); }
            });
            this._sources.next(this.dataStore.sources);
        }, error => console.log(error));
    }

    constructor(private _dataService: DataService) {
        this.dataStore = { sources: [] };
        // Get the list of sources
        this.loadall();
    }
}