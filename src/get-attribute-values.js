import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import getScalarValues$ from "./get-scalar-values";
import getSubjectsTriggers$ from "./get-subjects-triggers";
import getObservablesValues$ from "./get-observables-values";
import 'core-js/stable/object/assign';

export default function getAttributeValues$(attributes) {
    return combineLatest([
        getScalarValues$(attributes),
        getSubjectsTriggers$(attributes),
        getObservablesValues$(attributes)
    ])
        .pipe(map(([scalarValues, subjectTriggers, observableValues]) => ({
            ...scalarValues,
            ...subjectTriggers,
            ...observableValues
        })));
}
