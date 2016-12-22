import { SourceField } from "../source/source";
import { TargetField } from "../target/target";

//Interfaces
export interface IMap {
    description: string;
    effective_Date: Date;
    active: boolean;
    transformations?: ITransformation[],
    mapId?: number;
}

export interface ITransformation {
    description: string;
    rule: IRule;
    conditions: ICondition[]
}

export interface ICondition {
    seqNum: number;
    chain_Operation: string;
    left_Paren?: string;
    operation: string;
    cond_Value: string;
    right_Paren?: string;
    sourceField?: SourceField;
}

export interface IRule {
    rule_Value?: string;
    alt_Value?: string;
    rule_Operation: string;
    targetField: TargetField;
    ruleSourceFields?: IRuleSourceField[];
}

export interface IRuleSourceField {
    seqNum: number;
    append?: string;
    prepend?: string;
    custom_Format?: string;
    sourceField: SourceField;
}

//Classes
export class Map implements IMap {
    public mapId?: number;
    constructor(
        public description: string,
        public effective_Date: Date,
        public active: boolean,
        public transformations?: Transformation[]) { }
}

export class Transformation implements ITransformation {
    constructor(
        public description: string,
        public rule: IRule,
        public conditions: Condition[]
    ) { }
}

export class Condition implements ICondition {
    constructor(
        public seqNum: number,
        public chain_Operation: string,
        public operation: string,
        public cond_Value: string,
        public left_Paren?: string,
        public right_Paren?: string,
        public sourceField?: SourceField
    ) { }
}

export class Rule implements IRule {
    constructor(     
        public rule_Operation: string,
        public targetField: TargetField,
        public ruleSourceFields?: RuleSourceField[],
        public rule_Value?: string,
        public alt_Value?: string,
    ) { }
}

export class RuleSourceField implements IRuleSourceField {
    constructor(
        public seqNum: number,
        public sourceField: SourceField,
        public append?: string,
        public prepend?: string,
        public custom_Format?: string
    ) { }
}