import createElementFunction from './create-element'
import fragment from "./fragment";

export default {
    createElement: createElementFunction,
    Fragment: fragment
}

export const createElement = createElementFunction;
export const h = createElementFunction;
export const Fragment = fragment;
