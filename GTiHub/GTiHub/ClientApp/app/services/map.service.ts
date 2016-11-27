import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ITransformation, IRule, IRuleSourceField, ICondition, IMap } from "../components/map/map";
import { DataService } from "./data.service";

@Injectable()
export class MapService {
    //Flags for whether or not we're editing values
    private editingMapSubj = new BehaviorSubject(false);
    private editingTransformSubj = new BehaviorSubject(false);
    private mapsSubj = new BehaviorSubject<Array<IMap>>([]);


    setEditingMap(editingMap: true) {
        this.editingMapSubj.next(editingMap);
    }
    setEditMap(editMap: IMap) {
        this.mapSubj.next(editMap);
        this.getTransformsForMap(editMap.mapId);
        this.editingMapSubj.next(true);
    }

    getAddingOrModifyingMap() {
        return this.editingMapSubj.asObservable();
    }






    // ------------------------------Subjects-----------------------------------------//

    // Values for tracking state of a map
    
    private mapSubj = new BehaviorSubject(null);
    private mapTransformsSubj = new BehaviorSubject<Array<ITransformation>>([]);
    private mapAddingOrModifyingTransSubj = new BehaviorSubject(false);
    

    // Values for tracking state of a transformation
    //private transformSubj = new BehaviorSubject(new Transformation("", null, []));

    // Rule / rule source fields
    rsfSeqNum = 1;
    //private ruleSubj = new BehaviorSubject(new Rule("", "", "", null, []));
    private ruleSourceFieldsSubj = new BehaviorSubject<Array<IRuleSourceField>>([]);

    // Conditions
    condSeqNum = 1;
    private conditionsSubj = new BehaviorSubject<Array<ICondition>>([]);

    // -------------------------------Methods-----------------------------------------//

    // Map methods
    getMap() {
        return this.mapSubj.asObservable();
    }

    addOrUpdateMap() {
        const map = this.mapSubj.getValue();
        map.transformations = this.mapTransformsSubj.getValue();
        this._dataService.Add("Maps", map).subscribe(() => {}, error => console.log(error), () => {});
    }

    refreshMapsList() {
        this._dataService.GetAll("Maps")
            .subscribe(maps => this.mapsSubj.next(maps), error => console.log(error), () => {});
    }

    getMapsList() {
        return this.mapsSubj.asObservable();
    }


    deleteMap(deleteMap: IMap) {
    }

    

    // Transform methods
    setTransform(transform: ITransformation, editing: boolean) {
        if (editing) {
            // Load Rule and Condition data for the transform to be edited
            //this.transformSubj.next(transform);
        } else {
            //this.transformSubj.next(new Transformation("", null, []));
        }
    }

    getTransform() {
        //return this.transformSubj.asObservable();
    }

    createOrUpdateTransform() {
        //// Currently adding a transform
        //if (this.mapAddingOrModifyingTransSubj.getValue()) {
        //    //const transform = this.transformSubj.getValue();
        //    transform.conditions = this.conditionsSubj.getValue();
        //    //const rule = this.ruleSubj.getValue();
        //    rule.ruleSourceFields = this.ruleSourceFieldsSubj.getValue();
        //    transform.rule = rule;
        //    this.mapTransformsSubj.next(this.mapTransformsSubj.getValue().concat(this.transformSubj.getValue()));
        //}
        //// Currently editing a transform
        //else {
        //}
    }

    resetTransformSubjects() {
        //this.transformSubj.next(new Transformation("", null, []));
        //this.ruleSubj.next(new Rule("", "", "", null, []));
        //this.ruleSourceFieldsSubj.next([]);
        //this.conditionsSubj.next([]);
        //this.addingOrModifyingTransform(false);
    }

    addingOrModifyingTransform(addingTransform: boolean) {
        this.mapAddingOrModifyingTransSubj.next(addingTransform);
    }

    getAddingOrModifyingTransform() {
        return this.mapAddingOrModifyingTransSubj.asObservable();
    }

    getMapTransforms() {
        return this.mapTransformsSubj.asObservable();
    }

    removeMapTransform(transform: ITransformation) {
        const filtered = this.mapTransformsSubj.getValue().filter(function(el) { return el !== transform });
        this.mapTransformsSubj.next(filtered);
    }

    getTransformsForMap(mapId: number) {
        this._dataService.GetAllWithId("Maps/GetMapTransforms", mapId)
            .subscribe(transforms => {
                    this.mapTransformsSubj.next(transforms);
                },
                error => console.log(error),
                () => {});
    }

    // Rule methods
    setRule(rule: IRule) {
        //this.ruleSubj.next(rule);
    }

    getRule() {
        //return this.ruleSubj.asObservable();
    }

    // Rule Source Fields methods
    setRuleSourceFields(ruleSourceFields: IRuleSourceField[]) {
        this.ruleSourceFieldsSubj.next(ruleSourceFields);
    }

    getRuleSourceFields() {
        return this.ruleSourceFieldsSubj.asObservable();
    }

    addRuleSourceField() {
        //// Use concat here since push would return the length of the array post push
        //this.ruleSourceFieldsSubj.next(this.ruleSourceFieldsSubj.getValue()
        //    .concat(new RuleSourceField(this.rsfSeqNum++, "", "", "", null)));
    }

    removeRuleSourceField(ruleSourceField: IRuleSourceField) {
        // Use filter in order to return list
        const ruleSourceFields = this.ruleSourceFieldsSubj.getValue();
        const removeIndex = ruleSourceFields.indexOf(ruleSourceField);
        for (let i = removeIndex; i < ruleSourceFields.length; i++) {
            ruleSourceFields[i].seqNum--;
        }
        const filtered = ruleSourceFields.filter(function(el) { return el !== ruleSourceField });
        this.ruleSourceFieldsSubj.next(filtered);
    }

    // Condition methods
    setConditions(conditions: ICondition[]) {
        this.conditionsSubj.next(conditions);
    }

    getConditions() {
        return this.conditionsSubj.asObservable();
    }

    addCondition() {
        //// Use concat here since push would return the length of the array post push
        //this.conditionsSubj.next(this.conditionsSubj.getValue()
        //    .concat(new Condition(this.condSeqNum++, "", "", "", "", "", null)));
    }

    removeCondition(condition: ICondition) {
        // Use filter in order to return list
        const conditions = this.conditionsSubj.getValue();
        const removeIndex = conditions.indexOf(condition);
        for (let i = removeIndex; i < conditions.length; i++) {
            conditions[i].seqNum--;
        }
        const filtered = conditions.filter(function(el) { return el !== condition });
        this.conditionsSubj.next(filtered);
    }

    constructor(private _dataService: DataService) {
        // Get the list of maps
        this.refreshMapsList();
    }
}