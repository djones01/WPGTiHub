import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ISource, ISourceField } from "../components/source/source";
import { SourceService } from "./source.service";

@Injectable()
export class SFieldSelectService {
    sources: Observable<ISource[]>;
    private _sources: BehaviorSubject<ISource[]>;
    filteredSrcFlds: Observable<ISourceField[]>;
    private _filteredSrcFlds: BehaviorSubject<ISourceField[]>;

    private dataStore: {
        sources: ISource[],
        selectedSource: ISource,
        filteredSrcFlds: ISourceField[]
        selectedSrcFld: ISourceField
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

        this._sources = <BehaviorSubject<ISource[]>>new BehaviorSubject([]);
        this._filteredSrcFlds = <BehaviorSubject<ISourceField[]>>new BehaviorSubject([]);

        this.sources = this._sources.asObservable();
        this.filteredSrcFlds = this._filteredSrcFlds.asObservable();

        //Init list of sources
        this.sourceService.sources.subscribe(sources => {
            this.dataStore.sources = sources
            this._sources.next(this.dataStore.sources);
        });
    }
}