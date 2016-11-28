import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ITarget, ITargetField } from "../components/target/target";
import { DataService } from "./data.service";

@Injectable()
export class TFieldSelectService {
    private targetsSubj = new BehaviorSubject<Array<ITarget>>([]);
    private filteredTargetFieldsSubj = new BehaviorSubject([]);
    private selectedTargetFieldSubj = new BehaviorSubject<ITargetField>(null);

    getSelectedTargetField(): Observable<ITargetField> {
        return this.selectedTargetFieldSubj.asObservable();
    }

    setSelectedTargetField(targetField: ITargetField) {
        this.selectedTargetFieldSubj.next(targetField);
    }

    filterTargetFields(targetId: number) {
        this.selectedTargetFieldSubj.next(null);
        //Set the available target fields
        this._dataService.GetAllWithId("Targets/GetTargetFieldsByTarget", targetId)
            .subscribe(targetFields => {
                this.filteredTargetFieldsSubj.next(targetFields);
            });
    }

    getFilteredTargetFields(): Observable<ITargetField[]> {
        return this.filteredTargetFieldsSubj.asObservable();
    }

    getTargets(): Observable<ITarget[]> {
        return this.targetsSubj.asObservable();
    }

    initTargets() {
        this._dataService.GetAll("Targets")
            .subscribe(targets => this.targetsSubj.next(targets), error => console.log(error));
    }

    constructor(private _dataService: DataService) { }
}