import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Source, SourceField } from "../components/source/source";
import { DataService } from "./data.service";

@Injectable()
export class SFieldSelectService {
    private sourcesSubj = new BehaviorSubject<Array<Source>>([]);
    private selectedSourceSubj = new BehaviorSubject(null);
    private hasSelectedSourceSubj = new BehaviorSubject(false);
    private selectedSourceFieldSubj = new BehaviorSubject(null);
    private filteredSourceFieldsSubj = new BehaviorSubject([]);
    private hasSourceFieldSubj = new BehaviorSubject(false);

    //Source methods
    setSelectedSource(source: Source) {
        this.selectedSourceSubj.next(source);
        this.hasSelectedSourceSubj.next(true);

        //Set the available source fields
        this._dataService.GetAllWithId("Sources/GetSourceFieldsBySource",
                this.selectedSourceSubj.getValue()["sourceId"])
            .subscribe(sourceFields => {
                this.filteredSourceFieldsSubj.next(sourceFields);
            });

        this.hasSourceFieldSubj.next(false);
    }

    getSelectedSource(): Observable<Source> {
        return this.selectedSourceSubj.asObservable();
    }

    hasSelectedSource(): Observable<boolean> {
        return this.hasSelectedSourceSubj.asObservable();
    }

    getSources(): Observable<Source[]> {
        return this.sourcesSubj.asObservable();
    }

    setSources(sources: Source[]) {
        this.sourcesSubj.next(sources);
    }

    addSource(source: Source) {
        //Use concat here since push would return the length of the array post push
        this.sourcesSubj.next(this.sourcesSubj.getValue().concat(source));
    }

    initSources() {
        this._dataService.GetAll("Sources")
            .subscribe(sources => this.sourcesSubj.next(sources), error => console.log(error));
    }

    //Sourcefield methods
    setSelectedSourceField(sourceField: SourceField) {
        this.selectedSourceFieldSubj.next(sourceField);

        this.hasSourceFieldSubj.next(true);
    }

    getSelectedSourceField(): Observable<SourceField> {
        return this.selectedSourceFieldSubj.asObservable();
    }

    //Filtered sourcefields
    getFilteredSourceFields(): Observable<SourceField[]> {
        return this.filteredSourceFieldsSubj.asObservable();
    }

    //Whether or not the modal has a selected sourcefield
    hasSelectedSourceField(): Observable<boolean> {
        return this.hasSourceFieldSubj.asObservable();
    }

    constructor(private _dataService: DataService) {

    }

}