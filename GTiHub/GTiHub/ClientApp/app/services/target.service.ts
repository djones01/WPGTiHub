import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import { Target, TargetField } from "../components/target/target";

@Injectable()
export class TargetService {
    private seqNumCount = 1;

    //Values for tracking state of Target
    private targetSubj = new BehaviorSubject(new Target("", "", "", true, null));

    //Values for tracking state of Target targetfields
    private targetFieldsSubj = new BehaviorSubject<Array<TargetField>>([]);
    private hasTargetFieldsSubj = new BehaviorSubject(false);

    //Target's targetfield methods
    createOrUpdateTarget() {
        const target = this.targetSubj.getValue();
        target.targetFields = this.targetFieldsSubj.getValue();
        this._dataService.Add("Targets", target).subscribe(target => {}, error => console.log(error));
    }

    setTarget(target: Target) {
        this.targetSubj.next(target);
    }

    getTarget(): Observable<Target> {
        return this.targetSubj.asObservable();
    }

    //Target's targetfield methods
    modifyTFields(sFieldCount: number) {
        const targetFieldsCount = this.targetFieldsSubj.getValue().length;
        //Need to add target fields
        if (sFieldCount > targetFieldsCount) {
            for (let i = 0; i < (sFieldCount - targetFieldsCount); i++) {
                this.addNewTargetField();
            }
        }
        //Need to remove target fields
        else {
            this.removeTargetFields(targetFieldsCount - sFieldCount);
        }
    }

    setTargetFields(targetFields: TargetField[]) {
        this.targetFieldsSubj.next([]);
        this.targetFieldsSubj.next(targetFields);
        this.setHasTargetFields();
    }

    getTargetFields(): Observable<TargetField[]> {
        return this.targetFieldsSubj.asObservable();
    }

    addNewTargetField() {
        //Use concat here since push would return the length of the array post push
        this.targetFieldsSubj.next(this.targetFieldsSubj.getValue()
            .concat(new TargetField("N/A", "text", true, this.seqNumCount++)));
        this.setHasTargetFields();
    }

    removeTargetField(targetField: TargetField, i) {
        const targetFields = this.targetFieldsSubj.getValue();
        //Update sequence numbers of all targetFields with seq num greater than the deleted one
        for (var j = i, len = targetFields.length; j < len; j++) {
            targetFields[j].seqNum--;
        }
        this.seqNumCount--;

        //Use filter in order to return list
        const filtered = targetFields.filter(function(el) { return el != targetField });
        this.targetFieldsSubj.next(filtered);
        this.setHasTargetFields();
    }

    removeTargetFields(removeCount) {
        let targetFields = this.targetFieldsSubj.getValue();
        targetFields = targetFields.splice(0, targetFields.length - removeCount);
        this.seqNumCount -= removeCount;
        this.targetFieldsSubj.next(targetFields);
        this.setHasTargetFields();
    }

    setHasTargetFields() {
        if (this.targetFieldsSubj.getValue().length == 0) {
            this.hasTargetFieldsSubj.next(false);
        } else {
            this.hasTargetFieldsSubj.next(true);
        }
    }

    hasTargetFields(): Observable<boolean> {
        return this.hasTargetFieldsSubj.asObservable();
    }

    clear() {
        this.targetSubj.next(new Target("", "", "", true, null));
        this.targetFieldsSubj.next([]);
        this.hasTargetFieldsSubj.next(false);
    }

    constructor(private _dataService: DataService) {

    }
}