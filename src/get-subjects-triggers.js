import {of, isObservable} from 'rxjs';
import 'core-js/stable/object/entries';
import 'core-js/modules/es.object.from-entries'

export default function getSubjectsTriggers$(attributes) {
    return of(
        Object.fromEntries(
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
