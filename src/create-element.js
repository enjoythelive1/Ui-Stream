import {map} from 'rxjs/operators';
import {getDescription$} from './get-description';
import 'core-js/stable/object/assign';
import 'core-js/stable/array/includes';
import 'core-js/stable/array/flat';

export default function createElement(tag, attributes={}, ...children) {
    if (!['string', 'function'].includes(typeof tag)) throw new Error('Tag must be a function or string');

    const flatChildren = children.flat();

    if (typeof tag === 'function') {
        return tag(attributes, flatChildren);
    }

    return getDescription$(attributes, flatChildren)
        .pipe(map((description) => ({tag, ...description})));
}
