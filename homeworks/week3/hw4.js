const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})
const lines = []
rl.on('line', (line) => {
  lines.push(line)
})
rl.on('close', () => {
  solution(lines)
})

function solution(lines) {
  const str = lines[0]
  if (reverse(str) === str) console.log('True')
  else console.log('False')
}

function reverse(str) {
  let reverStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    reverStr += str[i]
  }
  return reverStr
}
