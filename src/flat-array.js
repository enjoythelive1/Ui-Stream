export function flatArray(children) {
    return children.reduce((acc, item) => acc.concat(item), []);
}
