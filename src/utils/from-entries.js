export function fromEntries(entries) {
    return entries
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}
