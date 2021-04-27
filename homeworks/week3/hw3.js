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
  const length = Number(lines[0])
  const arr = []
  for (let i = 1; i < length + 1; i++) {
    arr.push(Number(lines[i]))
  }
  for (let i = 0; i < length; i++) {
    console.log(isPrime(arr[i]))
  }
}

function isPrime(num) {
  const mid = Math.sqrt(num)
  if (num === 1) return 'Composite'
  for (let i = 2; i <= mid; i++) {
    if (num % i === 0) return 'Composite'
  }
  return 'Prime'
}
