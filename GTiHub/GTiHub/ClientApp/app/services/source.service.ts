import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ISource, ISourceField } from "../components/source/source";
import { DataService } from "./data.service";

@Injectable()
export class SourceService {
    private _sources: BehaviorSubject<ISource[]> = new BehaviorSubject([]);
    sources: Observable<ISource[]> = this._sources.asObservable();
    private _editSource: BehaviorSubject<ISource> = new BehaviorSubject(null);
    editSource: Observable<ISource> = this._editSource.asObservable();

    private dataStore: {
        sources: ISource[]
    };

    loadall() {
        this._dataService.GetAll("Sources")
            .subscribe(sources => {
                this.dataStore.sources = sources;
                this._sources.next(this.dataStore.sources);
            }, error => console.log(error), () => { });
    }

    getSourceFields(sourceId: number): Observable<ISourceField[]> {
        return this._dataService.Get("Sources/GetSourceFieldsbySource", sourceId);
    }

    setEditSource(editSource: ISource) {
        // Filter source fields for the source being edited
        this.getSourceFields(editSource.sourceId)
            .subscribe(sourceFields => {
                editSource.sourceFields = sourceFields;
                this._editSource.next(editSource);
            },
            error => console.log(error));
    }

    clearEditSource() {
        this._editSource.next(null);
    }

    add(source: ISource) {
        this._dataService.Add('Sources', source).subscribe(source => {
            this.dataStore.sources.push(source);
            this._sources.next(this.dataStore.sources);
        }, error => console.log(error));
    }

    update(source: ISource) {
        this._dataService.Update('Sources', source.sourceId, source).subscribe((source: ISource) => {
            this.dataStore.sources.forEach((m, i) => {
                if (m.sourceId === source.sourceId) { this.dataStore.sources[i] = source; }
            });
            this._sources.next(this.dataStore.sources);
        }, error => console.log(error));
    }

    deleteSource(sourceId: number) {
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