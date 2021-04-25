var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
});
//將input push into lines
var lines = [];
rl.on("line", function (line) {
    lines.push(line);
});
//回傳結果
rl.on("close", function () {
    solution(lines);
});


function solution(lines) {
    let str = lines[0]
    if (reverse(str) === str) console.log("True")
    else console.log("False")
}


function reverse(str) {
    let reverStr = ""
    for (let i = str.length - 1; i >= 0; i--) {
        reverStr += str[i]
    }
    return reverStr
}