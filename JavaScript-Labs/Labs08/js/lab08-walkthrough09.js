var isCanadian = true;

function calculateTax(amount, taxRate) {
    return amount * taxRate();
}

function calculateTotal(price, quantity) {
    var amount = price * quantity;
    return amount + calculateTax(amount, function () {
        return isCanadian ? 0.05 : 0;
    });
}