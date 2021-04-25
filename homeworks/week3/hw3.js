var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin
});
//將input存到lines
var lines = []
rl.on('line', function(line) {
    lines.push(line)
});
//回傳結果
rl.on('close', function() {
    solution(lines)
})


function solution(lines) {
    let length = Number(lines[0])
    let arr = []
    for (let i = 1; i < length + 1; i++) {
        arr.push(Number(lines[i]))
    }
    for (let i = 0; i < length; i++) {
        console.log(isPrime(arr[i]))
    }
}

function isPrime(num) {
    let mid = Math.sqrt(num)
    if (num === 1) return "Composite"
    for (let i = 2; i <= mid; i++) {
        if (num % i === 0) return "Composite"
    }
    return "Prime"
}