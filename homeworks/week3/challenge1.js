/*eslint-disable*/
const maze = [
  '..########',
  '#........#',
  '########.#',
  '#........#',
  '#.########',
  '#........#',
  '########.#',
  '#........#',
  '#.######.#',
  '########..']

function findShortPath(maze) {
  const height = maze.length
  const length = maze[0].length
  const endY = height - 1
  const endX = length - 1
  const steps = [] // 存放走到 (y,x) 的最短步數
  for (let i = 0; i < height; i++) {
    steps.push([])
  }
  const directions = [
    {
      dx: 1,
      dy: 0
    },
    {
      dx: -1,
      dy: 0
    },
    {
      dx: 0,
      dy: 1
    },
    {
      dx: 0,
      dy: -1
    }
  ]
  const queque = [ // 存放要嘗試往 上下左右 走的點
    {
      x: 0,
      y: 0
    }
  ]

  steps[0][0] = 0
  while (queque.length) {
    const { x, y } = queque.shift()
    for (const d of directions) { //  (x,y)把上下左右都嘗試過一遍, 不該走的情況( if )則跳過( continue loop )
      const nextX = x + d.dx
      const nextY = y + d.dy
      if (nextX > length - 1 || nextY > height - 1 || nextY < 0 || nextX < 0 || maze[nextY][nextX] !== '.') {
        // height 從 1 開始算
        // 用 !== '#' 會不能 AC, 為什麼?
        continue
      }
      if (steps[nextY][nextX] !== undefined) {
        // 用 !== undefined, 因為 steps 存放的是"最短路徑", 所以如果已經有數值在裡面了(!== undefined)，那這個點就已經走過了, 就不用再走了
        // 用 !== undefined, 也可以排除往回走的情況

        // 解答裡面有放 steps[y][x] + 1 >= steps[nextY][nextX] 這個條件，但即使拿掉也可以在 LIOJ AC，不太懂這個條件是要處理甚麼原因?
        // stepsA + 1 >= stepsB, 如果 A 走到 B 是最短路徑的話則 stepsA + 1 < stepsB, 至於往回走的情況也是同理, 肯定會繞遠路, 不是最短路徑
        continue
      }
      steps[nextY][nextX] = steps[y][x] + 1
      queque.push(
        {
          x: nextX,
          y: nextY
        }
      )
    }
  }
  return steps[endY][endX]
}

console.log(findShortPath(maze))
