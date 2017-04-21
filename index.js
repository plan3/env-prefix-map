'use strict';

module.exports = function(envMap, prefix, keyMappingFn = (k) => k.toLowerCase(), valueMappingFn = (v) => v) {
    const actualPrefix = prefix.endsWith('_') ? prefix : prefix + '_';
    return Object.keys(envMap)
        .filter(k => k.startsWith(actualPrefix))
        .map(k => [keyMappingFn(k.substring(actualPrefix.length)), valueMappingFn(envMap[k])])
        .reduce((acc, pair) => {
            acc[pair[0]] = pair[1];
            return acc;
        }, {});
}
