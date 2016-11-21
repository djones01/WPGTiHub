import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Target, TargetField } from "../components/target/target";
import { DataService } from "./data.service";

@Injectable()
export class TFieldSelectService {
    private targetsSubj = new BehaviorSubject<Array<Target>>([]);
    private selectedTargetSubj = new BehaviorSubject(null);
    private hasSelectedTargetSubj = new BehaviorSubject(false);
    private selectedTargetFieldSubj = new BehaviorSubject(null);
    private filteredTargetFieldsSubj = new BehaviorSubject([]);
    private hasTargetFieldSubj = new BehaviorSubject(false);

    //Target methods
    setSelectedTarget(target: Target) {
        this.selectedTargetSubj.next(target);
        this.hasSelectedTargetSubj.next(true);

        //Set the available target fields
        this._dataService.GetAllWithId("Targets/GetTargetFieldsByTarget",
                this.selectedTargetSubj.getValue()["targetId"])
            .subscribe(targetFields => {
                this.filteredTargetFieldsSubj.next(targetFields);
            });

        this.hasTargetFieldSubj.next(false);
    }

    getSelectedTarget(): Observable<Target> {
        return this.selectedTargetSubj.asObservable();
    }

    hasSelectedTarget(): Observable<boolean> {
        return this.hasSelectedTargetSubj.asObservable();
    }

    getTargets(): Observable<Target[]> {
        return this.targetsSubj.asObservable();
    }

    setTargets(targets: Target[]) {
        this.targetsSubj.next(targets);
    }

    addTarget(target: Target) {
        //Use concat here since push would return the length of the array post push
        this.targetsSubj.next(this.targetsSubj.getValue().concat(target));
    }

    initTargets() {
        this._dataService.GetAll("Targets")
            .subscribe(targets => this.targetsSubj.next(targets), error => console.log(error));
    }

    //Targetfield methods
    setSelectedTargetField(targetField: TargetField) {
        this.selectedTargetFieldSubj.next(targetField);

        this.hasTargetFieldSubj.next(true);
    }

    getSelectedTargetField(): Observable<TargetField> {
        return this.selectedTargetFieldSubj.asObservable();
    }

    //Filtered targetfields
    getFilteredTargetFields(): Observable<TargetField[]> {
        return this.filteredTargetFieldsSubj.asObservable();
    }

    //Whether or not the modal has a selected targetfield
    hasSelectedTargetField(): Observable<boolean> {
        return this.hasTargetFieldSubj.asObservable();
    }

    constructor(private _dataService: DataService) {

    }

}