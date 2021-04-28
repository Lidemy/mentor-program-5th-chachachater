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
  const length = Number(lines[0])
  const arr = []
  for (let i = 1; i < length + 1; i++) {
    arr.push(Number(lines[i]))
  }
  for (let i = 0; i < length; i++) {
    const answer = isPrime(arr[i])
    if (answer === 1) {
      console.log('Composite')
    }
    else console.log('Prime')
  }
  return
}

function isPrime(num) {
  const mid = Math.sqrt(num)
  if (num === 1) return 1
  for (let i = 2; i <= mid; i++) {
    if (num % i === 0) return 1
  }
  return -1
}
