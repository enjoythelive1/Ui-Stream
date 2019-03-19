import {combineLatest, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {isObservable} from "rxjs/internal-compatibility";
import {fromEntries} from "./utils/from-entries";

export default function getObservablesValues$(attributes) {
    const entries = Object.entries(attributes)
        .filter(
            ([, value]) =>
                isObservable(value) &&
                typeof value.next !== 'function'
        );

    if (entries.length === 0) return of({});

    return combineLatest(
        entries
            .map(([key, value$]) => value$.pipe(
                map(value => [key, value])
            ))
    )
        .pipe(
            map(entries => fromEntries(entries)),
        );
}
