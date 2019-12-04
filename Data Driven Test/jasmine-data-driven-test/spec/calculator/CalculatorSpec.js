describe('Calculator', function () {
    var using = require('jasmine-data-provider');

    var Calculator = require('./../../src/calculator/Calculator');
    var calculator;

    beforeEach(function () {
        calculator = new Calculator();
    });

    describe('test subtraction', function () {
        // using provider as direct array
        using([{a: 5, b: 2, expected: 3}, {a: 25, b: 26, expected: -1}], function (data) {
            it('should calc with operator -', function () {
                var result = calculator.calc(data.a, data.b, '-');
                console.log("subtraction result "+result);
                expect(result).toEqual(data.expected);
            });
        });
    });

    describe('test addition', function () {
        function plusProvider() {
            return [
                {a: 2, b: 3, expected: 5},
                {a: '14', b: 15, expected: 29},
                {a: 12, b: '13', expected: 25},
                {a: '22', b: '13', expected: 35},
            ];
        }

        // using provider function which returns array
        using(plusProvider, function (data) {
            it('should calc with operator +', function () {
                var result = calculator.calc(data.a, data.b, '+');
                 console.log("addition result "+result);

                expect(result).toEqual(data.expected);
            });
        });
    });

    describe('test multiplication', function () {
        function timesProvider() {
            return [
                {a: 2, b: 3, expected: 6},
                {a: '10', b: 5, expected: 50},
                {a: 12, b: '3', expected: 36},
                {a: '2', b: '13', expected: 26},
            ];
        }

        using(timesProvider, function (data) {
            it('should calc with operator *', function () {
                var result = calculator.calc(data.a, data.b, '*');
             console.log("Multiplication result "+result);
                expect(result).toEqual(data.expected);
            });
        });
    });

    describe('test division', function () {
        function timesProvider() {
            return [
                {a: 6, b: 3, expected: 2},
                {a: '10', b: 5, expected: 2},
                {a: 12, b: '3', expected: 4},
                {a: '20', b: '10', expected: 2},
            ];
        }

        using(timesProvider, function (data) {
            it('should calc with operator /', function () {
                var result = calculator.calc(data.a, data.b, '/');
                console.log("Division result "+result);
                expect(result).toEqual(data.expected);
            });
        });
    });
});
