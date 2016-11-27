import { ISourceField } from "../source/source";
import { TargetField } from "../target/target";

export interface IMap {
    description: string;
    effective_Date: Date;
    active: boolean;
    transformations: ITransformation[],
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
    left_Paren: string;
    operation: string;
    cond_Value: string;
    right_Paren: string;
    sourceField: ISourceField;
}

export interface IRule {
    rule_Value: string;
    alt_Value: string;
    rule_Operation: string;
    targetField: TargetField;
    ruleSourceFields: IRuleSourceField[];
}

export interface IRuleSourceField {
    seqNum: number;
    append: string;
    prepend: string;
    custom_Format: string;
    sourceField: ISourceField;
}