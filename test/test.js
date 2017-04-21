'use strict';

const assert = require('chai').assert;
const extractor = require('../index.js');

describe('Prefixed env vars extractor', function() {
    it('Should leave non prefixed vars aside', function() {
        const result = extractor({ 'AAA': '1', 'BBB': '2'}, 'CCC');
        assert.deepEqual(result, {});
    });

    it('Should extract values prefixed and lowercase keys', function() {
        const result = extractor({ 'AAA_AB': '1', 'AAA_AA': '2', 'BBB': '3'}, 'AAA');
        assert.deepEqual(result, {ab: '1', aa: '2'});
    });

    it('Should allow adding _ suffix the prefix', function() {
        const result = extractor({ 'AAA_AB': '1', 'BBB': '3'}, 'AAA_');
        assert.deepEqual(result, {ab: '1'});
    });

    it('Applies function on values afterwards', function() {
        const result = extractor({'AAA_AB': '1', 'AAA_BC': '2'}, 'AAA', k => k, v => Number(v));
        assert.deepEqual(result, {AB: 1, BC: 2});
    });

    it('Applies function on keys afterwards', function() {
        const result = extractor({'AAA_AB': '1', 'AAA_BC': '2'}, 'AAA', k => k.toLowerCase() + '1');
        assert.deepEqual(result, {'ab1': '1', 'bc1': '2'});
    });
})
