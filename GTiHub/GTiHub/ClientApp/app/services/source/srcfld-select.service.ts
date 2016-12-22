import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Source, SourceField } from "../../components/source/source";
import { SourceService } from "./source.service";

@Injectable()
export class SFieldSelectService {
    sources: Observable<Source[]>;
    private _sources: BehaviorSubject<Source[]>;
    filteredSrcFlds: Observable<SourceField[]>;
    private _filteredSrcFlds: BehaviorSubject<SourceField[]>;

    private dataStore: {
        sources: Source[],
        selectedSource: Source,
        filteredSrcFlds: SourceField[]
        selectedSrcFld: SourceField
    };

    filterSrcFlds(sourceId: number) {
        this.sourceService.getSourceFields(sourceId)
            .subscribe(sourceFields => {
                this.dataStore.filteredSrcFlds = sourceFields;
                this._filteredSrcFlds.next(this.dataStore.filteredSrcFlds);
            }, error => console.log(error));
    }

    constructor(private sourceService: SourceService) {
        this.dataStore = { sources: [], selectedSource: null, filteredSrcFlds: [], selectedSrcFld: null };

        this._sources = <BehaviorSubject<Source[]>>new BehaviorSubject([]);
        this._filteredSrcFlds = <BehaviorSubject<SourceField[]>>new BehaviorSubject([]);

        this.sources = this._sources.asObservable();
        this.filteredSrcFlds = this._filteredSrcFlds.asObservable();

        //Init list of sources
        this.sourceService.sources.subscribe(sources => {
            this.dataStore.sources = sources
            this._sources.next(this.dataStore.sources);
        });
    }
}