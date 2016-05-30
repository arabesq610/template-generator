/*global it, describe*/
var chai = require('chai');

var expect = chai.expect; // Use the "expect" style of Chai

var TemplateGenerator = require('./../TemplateGenerator');

describe('TemplateGenerator', function () {
    'use strict';

    it('generateTemplate() should return 0 if not passed any arguments', function () {
        var tg = new TemplateGenerator();
        expect(tg).to.equal(undefined);
    });

});
