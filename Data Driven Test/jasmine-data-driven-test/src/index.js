var Calculator = require('./calculator/Calculator');
var CalculatorController = require('./calculator/CalculatorController');

window.calculatorController = new CalculatorController(new Calculator);