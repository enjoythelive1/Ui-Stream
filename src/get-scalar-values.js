import {of, isObservable} from 'rxjs';
import 'core-js/stable/object/entries';
import 'core-js/modules/es.object.from-entries'

export default function getScalarValues$(attributes) {
    return of(
        Object.fromEntries(
            Object.entries(attributes).
            filter(([, value]) => !isObservable(value))
        )
    );
}
