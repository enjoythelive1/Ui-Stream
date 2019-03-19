import {of} from 'rxjs';
import {isObservable} from "rxjs/internal-compatibility";
import {fromEntries} from "./utils/from-entries";

export default function getSubjectsTriggers$(attributes) {
    return of(
        fromEntries(
            Object.entries(attributes)
                .filter(
                    ([, value]) =>
                        isObservable(value) &&
                        typeof value.next === 'function'
                )
                .map(([key, value]) => [key, value.next.bind(value)])
        )
    );
}
