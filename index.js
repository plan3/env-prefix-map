'use strict';

module.exports = function(envMap, prefix, {keyFn = (k) => k.toLowerCase(), valueFn = (v) => v} = {}) {
    return Object.keys(envMap)
        .filter(k => k.startsWith(prefix))
        .map(k => [keyFn(k.substring(prefix.length)), valueFn(envMap[k])])
        .reduce((acc, pair) => {
            acc[pair[0]] = pair[1];
            return acc;
        }, {});
};

