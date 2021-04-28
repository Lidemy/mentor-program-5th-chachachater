const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})
const lines = []
rl.on('line', (line) => {
  lines.push(line)
})
rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  const tmp = lines[0].split(' ')
  const start = Number(tmp[0])
  const end = Number(tmp[1])

  for (let i = start; i <= end; i++) {
    const digit = getDigit(i)
    const answer = isNarcissistic(digit, i)
    if (answer !== -1) {
      console.log(answer)
    }
  }
}

function getDigit(num) { // 回傳數字 n 有幾位數
  let digit = 0
  while (num !== 0) {
    num = Math.floor(num / 10)
    digit++
  }
  return digit
}

function isNarcissistic(digit, num) { // 輸入數字 num 和 num 是幾位數，確認是否為水仙花數，是水仙花數的話就回傳
  let sum = 0
  let tmp = num
  let remainder = 0
  for (let k = 0; k < digit; k++) {
    remainder = tmp % 10
    sum += Math.pow(remainder, digit)
    tmp = Math.floor(tmp / 10)
  }
  if (sum === num) {
    return num
  }
  return -1
}
