import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ISource, ISourceField } from "../components/source/source";
import { DataService } from "./data.service";

@Injectable()
export class SFieldSelectService {
    private sourcesSubj = new BehaviorSubject<Array<ISource>>([]);
    private filteredSourceFieldsSubj = new BehaviorSubject([]);
    private selectedSourceFieldSubj = new BehaviorSubject<ISourceField>(null);

    getSelectedSourceField(): Observable<ISourceField> {
        return this.selectedSourceFieldSubj.asObservable();
    }

    setSelectedSourceField(sourceField: ISourceField) {
        this.selectedSourceFieldSubj.next(sourceField);
    }

    filterSourceFields(sourceId: number) {
        this.selectedSourceFieldSubj.next(null);
        //Set the available source fields
        this._dataService.Get("Sources/GetSourceFieldsBySource", sourceId)
            .subscribe(sourceFields => {
                this.filteredSourceFieldsSubj.next(sourceFields);
            });
    }

    getFilteredSourceFields(): Observable<ISourceField[]> {
        return this.filteredSourceFieldsSubj.asObservable();
    }

    getSources(): Observable<ISource[]> {
        return this.sourcesSubj.asObservable();
    }

    initSources() {
        this._dataService.GetAll("Sources")
            .subscribe(sources => this.sourcesSubj.next(sources), error => console.log(error));
    }

    constructor(private _dataService: DataService) { }
}