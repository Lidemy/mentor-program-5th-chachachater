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
    let tmp = lines[0].split(' ');
    let n = Number(tmp[0]);
    let m = Number(tmp[1]);

    for (let i = n; i <= m; i++) {
        let d = digit(i);
        check(d, i);
    }
}

let digit = function(n) { //回傳數字 n 有幾位數
    let d = 0;
    while (n != 0) {
        n = Math.floor(n / 10);
        d++;
    }
    return d;
};



let check = function(d, m) { //輸入數字 m 和 m 是幾位數，確認是否為水仙花數，是水仙花數的話就印出來
    let sum = 0;
    let m = s;
    for (let k = 0; k < d; k++) {
        let num = m % 10;
        sum += Math.pow(num, d);
        m = Math.floor(m / 10);
    }
    if (sum === s) {
        console.log(s);
    }
};