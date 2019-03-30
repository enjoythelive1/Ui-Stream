import {combineLatest} from "rxjs";
import getAttributeValues$ from "./get-attribute-values";
import getChildren$ from "./get-children";
import {map} from "rxjs/operators";

export function getDescription$(attributes, children) {
    return combineLatest(getAttributeValues$(attributes || {}), getChildren$(children))
        .pipe(map(([attributes, children]) => ({attributes, children})));
}
