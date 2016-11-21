import { SourceField } from "../source/source";
import { TargetField } from "../target/target";

export class Map {
    constructor(
        public description: string,
        public effective_Date: Date,
        public active: boolean,
        public transformations: Transformation[],
        public mapId?: number
    ) {
    }
}

export class Transformation {
    constructor(
        public description: string,
        public rule: Rule,
        public conditions: Condition[]
    ) {
    }
}

export class Condition {
    constructor(
        public seqNum: number,
        public chain_Operation: string,
        public left_Paren: string,
        public operation: string,
        public cond_Value: string,
        public right_Paren: string,
        public sourceField: SourceField
    ) {
    }
}

export class Rule {
    constructor(
        public rule_Value: string,
        public alt_Value: string,
        public rule_Operation: string,
        public targetField: TargetField,
        public ruleSourceFields: RuleSourceField[]
    ) {
    }
}

export class RuleSourceField {
    constructor(
        public seqNum: number,
        public append: string,
        public prepend: string,
        public custom_Format: string,
        public sourceField: SourceField
    ) {
    }
}