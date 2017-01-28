import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Target, TargetField } from "../../components/target/target";
import { DataService } from "../data/data.service";

@Injectable()
export class TargetService {
    private _targets: BehaviorSubject<Target[]> = new BehaviorSubject([]);
    targets: Observable<Target[]> = this._targets.asObservable();
    private _editTarget: BehaviorSubject<Target> = new BehaviorSubject(null);
    editTarget: Observable<Target> = this._editTarget.asObservable();

    private dataStore: {
        targets: Target[]
    };

    loadall() {
        this._dataService.GetAll("Targets")
            .subscribe(targets => {
                this.dataStore.targets = targets;
                this._targets.next(this.dataStore.targets);
            }, error => console.log(error), () => { });
    }

    getTargetFields(targetId: number): Observable<TargetField[]> {
        return this._dataService.Get("Targets/GetTargetFieldsbyTarget", targetId);
    }

    setEditTarget(editTarget: Target) { 
        // Filter target fields for the target being edited
        this.getTargetFields(editTarget.targetId)
            .subscribe(targetFields => {
                editTarget.targetFields = targetFields;
                this._editTarget.next(editTarget);
            },
            error => console.log(error));
    }

    clearEditTarget() {
        this._editTarget.next(null);
    }

    add(target: Target) {
        this._dataService.Add('Targets', target).subscribe(newTarget => {
            this.dataStore.targets.push(newTarget);
            this._targets.next(this.dataStore.targets);
        }, error => console.log(error));
    }

    update(target: Target) {
        this._dataService.Update('Targets', target.targetId, target).subscribe((updatedTarget: Target) => {
            this.dataStore.targets.forEach((m, i) => {
                if (m.targetId === target.targetId) { this.dataStore.targets[i] = target; }
            });
            this._targets.next(this.dataStore.targets);
        }, error => console.log(error));
    }

    delete(targetId: number) {
        this._dataService.Delete('Targets', targetId).subscribe(response => {
            this.dataStore.targets.forEach((m, i) => {
                if (m.targetId === targetId) { this.dataStore.targets.splice(i, 1); }
            });
            this._targets.next(this.dataStore.targets);
        }, error => console.log(error));
    }

    constructor(private _dataService: DataService) {
        this.dataStore = { targets: [] };
        // Get the list of targets
        this.loadall();
    }
}