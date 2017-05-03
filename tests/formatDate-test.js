const assert = require('assert');
const formatDate = require('../formatDate');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

function runSuccessTest(date, expected) {
    return () => {
        const actual = formatDate(date);

        assert.equal(actual, expected);
    }
}

describe('formatDate', () => {
    describe('default task tests', () => {
        let clock;
        beforeEach(() => {
            //clock = sinon.useFakeTimers(Date.parse("2017-04-26T23:59:59.999Z"));
        });
        afterEach(() => {
            //clock.restore();
        });
        it(`should return '15:09' for 2017-04-26T15:09:10.609Z`, () => {
            clock = sinon.useFakeTimers((new Date(2017,4,26)).getTime());
            const actual = formatDate('2017-04-26T15:09:10.609Z');

            assert.equal(actual, '15:09');
            clock.restore();
        });
        it(`should return 'вчера в 15:09' for 2017-04-25T15:09:10.609Z`,
            runSuccessTest('2017-04-25T15:09:10.609Z', 'вчера в 15:09'));
        it(`should return '25 марта в 15:09' for 2017-03-25T15:09:10.609Z`,
            runSuccessTest('2017-03-25T15:09:10.609Z', '25 марта в 15:09'));
        it(`should return '25 марта 2016 года в 15:09' for 2016-03-25T16:09:10.609Z`,
            runSuccessTest('2016-03-25T16:09:10.609Z', '25 марта 2016 года в 15:09'));
    });
    // it(`should return '9:56' for 2017-05-02T9:56:39.725Z`,
    //     runSuccessTest('2017-05-02T9:56:39.725Z', '9:56'));
    // it(`should return '9:56' for 2017-05-02T9:56:39.725Z`,
    //     runSuccessTest('2017-05-02T9:56:39.725Z', '9:56'));
});