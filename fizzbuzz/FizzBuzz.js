function isDivisibleBy(number, divisor) {
    return number % divisor === 0;
}   

function evaluateNumber(n) {
    let result = '';
    if (isDivisibleBy(n, 3)) result += 'Fizz';
    if (isDivisibleBy(n, 5)) result += 'Buzz';
    return result || n;
}

function fizzBuzz(n) {
    let result = '';
    for (let i = 1; i <= n; i++) {
        result += evaluateNumber(i);
    }
    return result;
}

console.log(fizzBuzz(20));