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
  const group = Number(lines[0])
  const arr = []
  for (let i = 1; i < group + 1; i++) {
    arr.push(lines[i].split(' '))
  }

  for (let i = 0; i < arr.length; i++) {
    console.log(playGame(arr[i][0], arr[i][1], arr[i][2]))
  }
}

function playGame(a, b, k) {
  let tmp
  if (k === '-1') {
    tmp = a
    a = b
    b = tmp
  }

  const aLength = a.length
  const bLength = b.length

  if (aLength > bLength) return 'A'
  else if (aLength < bLength) return 'B'
  else {
    for (let i = 0; i < aLength; i++) {
      if (a[i] > b[i]) return 'A'
      else if (a[i] < b[i]) return 'B'
      else { continue }
    }
    return 'DRAW'
  }
}
