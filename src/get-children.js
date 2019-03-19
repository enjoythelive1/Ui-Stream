import {isObservable, of, combineLatest} from "rxjs";
import {switchMap, tap} from 'rxjs/operators';

export default function getChildren$(children) {
    if (children === null || children.length === 0) return of(null);

    return combineLatest(
        children
            .map(child => isObservable(child) ? child : of(child))
            .map(child => child.pipe(switchMap(emission => isObservable(emission) ? emission: of(emission))))
    );
}
