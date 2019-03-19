import {of} from 'rxjs';
import {isObservable} from "rxjs/internal-compatibility";
import {fromEntries} from "./utils/from-entries";

export default function getScalarValues$(attributes) {
    return of(
        fromEntries(
            Object.entries(attributes).
            filter(([, value]) => !isObservable(value))
        )
    );
}
