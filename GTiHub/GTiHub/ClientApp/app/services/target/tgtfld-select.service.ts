import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Target, TargetField } from "../../components/target/target";
import { TargetService } from "./target.service";

@Injectable()
export class TFieldSelectService {
    targets: Observable<Target[]>;
    private _targets: BehaviorSubject<Target[]>;
    filteredTgtFlds: Observable<TargetField[]>;
    private _filteredTgtFlds: BehaviorSubject<TargetField[]>;

    private dataStore: {
        targets: Target[],
        selectedTarget: Target,
        filteredTgtFlds: TargetField[]
        selectedTgtFld: TargetField
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

        this._targets = <BehaviorSubject<Target[]>>new BehaviorSubject([]);
        this._filteredTgtFlds = <BehaviorSubject<TargetField[]>>new BehaviorSubject([]);

        this.targets = this._targets.asObservable();
        this.filteredTgtFlds = this._filteredTgtFlds.asObservable();

        //Init list of targets
        this.targetService.targets.subscribe(targets => {
            this.dataStore.targets = targets
            this._targets.next(this.dataStore.targets);
        });       
    }
}