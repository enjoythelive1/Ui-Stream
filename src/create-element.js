import {map} from 'rxjs/operators';
import {getDescription$} from "./get-params";
import {flatArray} from "./flat-array";

export default function createElement(tag, attributes={}, ...children) {
    if (['string', 'function'].indexOf(typeof tag) === -1) throw new Error('Tag must be a function or string');

    const flatChildren = flatArray(children);

    if (typeof tag === 'function') {
        return tag(attributes, flatChildren);
    }

    return getDescription$(attributes, flatChildren)
        .pipe(map((description) => ({tag, ...description})));
}
