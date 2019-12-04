function CalculatorController(calculator) {
    this.calculator = calculator;
}

CalculatorController.prototype.calcExam = function () {
    var result = this.calculator.calc(this.val('a'), this.val('b'), this.val('operator'));
    this.val('result', result);
};

CalculatorController.prototype.val = function (id, value) {
    var element = document.getElementById(id);

    if (value === undefined || value === null) {
        return element.value;
    }

    if (element.tagName === 'INPUT') {
        element.value = value;
    } else {
        element.innerHTML = value;
    }
};

module.exports = CalculatorController;
