import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ITarget, ITargetField } from "../components/target/target";
import { DataService } from "./data.service";

@Injectable()
export class TargetService {
    // Storage 
    targets: Observable<ITarget[]>;
    private _targets: BehaviorSubject<ITarget[]>;

    // Current editing target
    editTarget: Observable<ITarget>;
    private _editTarget: BehaviorSubject<ITarget>;

    private dataStore: {
        targets: ITarget[],
        editTarget: ITarget
    };

    loadall() {
        this._dataService.GetAll("Targets")
            .subscribe(targets => {
                this.dataStore.targets = targets;
                this._targets.next(this.dataStore.targets);
            }, error => console.log(error), () => { });
    }

    getTargetFields(targetId: number): Observable<ITargetField[]> {
        return this._dataService.Get("Targets/GetTargetFieldsbyTarget", targetId);
    }

    setEditTarget(editTarget: ITarget) {
        this.dataStore.editTarget = editTarget;
        // Filter target fields for the target being edited

        this._editTarget.next(editTarget);
    }

    initEditTarget() {
        this.dataStore.editTarget = { name: '', description: '', effective_Date: new Date(), active: true, targetFields: [] };
        this._editTarget.next(this.dataStore.editTarget);
    }

    add(target: ITarget) {
        this._dataService.Add('Targets', target).subscribe(target => {
            this.dataStore.targets.push(target);
            this._targets.next(this.dataStore.targets);
        }, error => console.log(error));
    }

    update(target: ITarget) {
        this._dataService.Update('Targets', target.targetId, target).subscribe((target: ITarget) => {
            this.dataStore.targets.forEach((m, i) => {
                if (m.targetId === target.targetId) { this.dataStore.targets[i] = target; }
            });
            this._targets.next(this.dataStore.targets);
        }, error => console.log(error));
    }

    deleteMap(targetId: number) {
        this._dataService.Delete('Targets', targetId).subscribe(response => {
            this.dataStore.targets.forEach((m, i) => {
                if (m.targetId === targetId) { this.dataStore.targets.splice(i, 1); }
            });
            this._targets.next(this.dataStore.targets);
        }, error => console.log(error));
    }

    constructor(private _dataService: DataService) {
        this.dataStore = { targets: [], editTarget: null };
        this._targets = <BehaviorSubject<ITarget[]>>new BehaviorSubject([]);
        this._editTarget = <BehaviorSubject<ITarget>>new BehaviorSubject(null);
        this.targets = this._targets.asObservable();
        this.editTarget = this._editTarget.asObservable();
        this.initEditTarget();
        // Get the list of targets
        this.loadall();
    }
}