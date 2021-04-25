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
    let line = Number(lines[0])
    for (let i = 0; i < line; i++) {
        let str = ""
        for (let j = 0; j < i + 1; j++) {
            str += "*"
        }
        console.log(str)
    }
}
