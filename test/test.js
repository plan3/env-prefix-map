'use strict';

const assert = require('chai').assert;
const extractor = require('../index.js');

describe('Prefixed env vars extractor', function() {
    it('Should leave non prefixed vars aside', function() {
        const result = extractor({ 'AAA': '1', 'BBB': '2'}, 'CCC_');
        assert.deepEqual(result, {});
    });

    it('Should extract values prefixed and lowercase keys', function() {
        const result = extractor({ 'AAA_AB': '1', 'AAA_AA': '2', 'BBB': '3'}, 'AAA_');
        assert.deepEqual(result, {ab: '1', aa: '2'});
    });

    it('Applies function on values afterwards', function() {
        const result = extractor({'AAA_AB': '1', 'AAA_BC': '2'}, 'AAA_', {valueFn: v => Number(v)});
        assert.deepEqual(result, {ab: 1, bc: 2});
    });

    it('Applies function on keys afterwards', function() {
        const result = extractor({'AAA_AB': '1', 'AAA_BC': '2'}, 'AAA_', {keyFn: k => k.toLowerCase() + '1'});
        assert.deepEqual(result, {'ab1': '1', 'bc1': '2'});
    });

    it('Applies function on keys and values', function() {
        const result = extractor({'AAA_AB': '1,2', 'AAA_BC': '3,4'}, 'AAA_', {keyFn: k => k + '1', valueFn: v => v.split(',').map(v => Number(v))});
        assert.deepEqual(result, {'AB1': [1,2], 'BC1': [3,4]});
    });
})
