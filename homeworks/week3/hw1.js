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
  const line = Number(lines[0])
  for (let i = 0; i < line; i++) {
    let str = ''
    for (let j = 0; j < i + 1; j++) {
      str += '*'
    }
    console.log(str)
  }
}
