import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import { Source, SourceField } from "../components/source/source";

@Injectable()
export class SourceService {
    private seqNumCount = 1;

    //Values for tracking state of Source
    private sourceSubj = new BehaviorSubject(new Source("", "", "", true, null));

    //Values for tracking state of Source sourcefields
    private sourceFieldsSubj = new BehaviorSubject<Array<SourceField>>([]);
    private hasSourceFieldsSubj = new BehaviorSubject(false);

    //Source's methods
    createOrUpdateSource() {
        const source = this.sourceSubj.getValue();
        source.sourceFields = this.sourceFieldsSubj.getValue();
        this._dataService.Add("Sources", source).subscribe(source => {}, error => console.log(error));
    }

    setSource(source: Source) {
        this.sourceSubj.next(source);
    }

    getSource(): Observable<Source> {
        return this.sourceSubj.asObservable();
    }

    //Source's sourcefield methods
    modifySFields(sFieldCount: number) {
        const sourceFieldsCount = this.sourceFieldsSubj.getValue().length;
        //Need to add source fields
        if (sFieldCount > sourceFieldsCount) {
            for (let i = 0; i < (sFieldCount - sourceFieldsCount); i++) {
                this.addNewSourceField();
            }
        }
        //Need to remove source fields
        else {
            this.removeSourceFields(sourceFieldsCount - sFieldCount);
        }
    }

    setSourceFields(sourceFields: SourceField[]) {
        this.sourceFieldsSubj.next([]);
        this.sourceFieldsSubj.next(sourceFields);
        this.setHasSourceFields();
    }

    getSourceFields(): Observable<SourceField[]> {
        return this.sourceFieldsSubj.asObservable();
    }

    addNewSourceField() {
        //Use concat here since push would return the length of the array post push
        this.sourceFieldsSubj.next(this.sourceFieldsSubj.getValue()
            .concat(new SourceField("N/A", "text", true, this.seqNumCount++)));
        this.setHasSourceFields();
    }

    removeSourceField(sourceField: SourceField, i) {
        const sourceFields = this.sourceFieldsSubj.getValue();
        //Update sequence numbers of all sourceFields with seq num greater than the deleted one
        for (var j = i, len = sourceFields.length; j < len; j++) {
            sourceFields[j].seqNum--;
        }
        this.seqNumCount--;

        //Use filter in order to return list
        const filtered = sourceFields.filter(function(el) { return el != sourceField });
        this.sourceFieldsSubj.next(filtered);
        this.setHasSourceFields();
    }

    removeSourceFields(removeCount) {
        let sourceFields = this.sourceFieldsSubj.getValue();
        sourceFields = sourceFields.splice(0, sourceFields.length - removeCount);
        this.seqNumCount -= removeCount;
        this.sourceFieldsSubj.next(sourceFields);
        this.setHasSourceFields();
    }

    setHasSourceFields() {
        if (this.sourceFieldsSubj.getValue().length == 0) {
            this.hasSourceFieldsSubj.next(false);
        } else {
            this.hasSourceFieldsSubj.next(true);
        }
    }

    hasSourceFields(): Observable<boolean> {
        return this.hasSourceFieldsSubj.asObservable();
    }

    clear() {
        this.sourceSubj.next(new Source("", "", "", true, null));
        this.sourceFieldsSubj.next([]);
        this.hasSourceFieldsSubj.next(false);
    }

    constructor(private _dataService: DataService) {

    }
}