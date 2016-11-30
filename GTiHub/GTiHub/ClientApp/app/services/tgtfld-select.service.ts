import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ITarget, ITargetField } from "../components/target/target";
import { TargetService } from "./target.service";

@Injectable()
export class TFieldSelectService {
    targets: Observable<ITarget[]>;
    private _targets: BehaviorSubject<ITarget[]>;
    filteredTgtFlds: Observable<ITargetField[]>;
    private _filteredTgtFlds: BehaviorSubject<ITargetField[]>;

    private dataStore: {
        targets: ITarget[],
        selectedTarget: ITarget,
        filteredTgtFlds: ITargetField[]
        selectedTgtFld: ITargetField
    };

    filterTgtFlds(targetId: number) {
        this.targetService.getTargetFields(targetId)
            .subscribe(targetFields => {
                this.dataStore.filteredTgtFlds = targetFields;
                this._filteredTgtFlds.next(this.dataStore.filteredTgtFlds);
            }, error => console.log(error));       
    }

    constructor(private targetService: TargetService) {
        this.dataStore = { targets: [], selectedTarget: null, filteredTgtFlds: [], selectedTgtFld: null };

        this._targets = <BehaviorSubject<ITarget[]>>new BehaviorSubject([]);
        this._filteredTgtFlds = <BehaviorSubject<ITargetField[]>>new BehaviorSubject([]);

        this.targets = this._targets.asObservable();
        this.filteredTgtFlds = this._filteredTgtFlds.asObservable();

        //Init list of targets
        this.targetService.targets.subscribe(targets => {
            this.dataStore.targets = targets
            this._targets.next(this.dataStore.targets);
        });       
    }
}