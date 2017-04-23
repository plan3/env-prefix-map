'use strict';

module.exports = function(envMap, prefix, keyMappingFn = (k) => k.toLowerCase(), valueMappingFn = (v) => v) {
    return Object.keys(envMap)
        .filter(k => k.startsWith(prefix))
        .map(k => [keyMappingFn(k.substring(prefix.length)), valueMappingFn(envMap[k])])
        .reduce((acc, pair) => {
            acc[pair[0]] = pair[1];
            return acc;
        }, {});
};

