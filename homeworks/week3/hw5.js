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
    let group = Number(lines[0])
    let arr = []
    for (let i = 1; i < group + 1; i++) {
        arr.push(lines[i].split(" "))
    }


    for (let i = 0; i < arr.length; i++) {
        console.log(playGame(arr[i][0], arr[i][1], arr[i][2]))
    }
}

function playGame(a, b, k) {

    if (k === '-1') {
        let tmp = a
        a = b
        b = tmp
    }

    let aLength = a.length
    let bLength = b.length

    if (aLength > bLength) return "A"
    else if (aLength < bLength) return "B"
    else {
        for (let i = 0; i < aLength; i++) {
            if (a[i] > b[i]) return "A"
            else if (a[i] < b[i]) return "B"
            else {continue}
        }
            return "DRAW"
    }
}