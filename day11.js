/* eslint-disable complexity */
const fs = require('fs')
const input = fs.readFileSync('./day11input.txt').toString().split(',').map(num => Number(num))
const rl = require('readline-sync')
let paintedCount = 0
const row = new Array(100).fill('.')
const grid = []
for (let i = 0; i < 6; i++) {
  grid.push([ ...row, ])
}
const gridMap = { '0, 0': 1, }
const UP = 'UP'
const DOWN = 'DOWN'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
let robotX = 0
let robotY = 0
const painting = 'painting'
const moving = 'moving'
let robotDir = UP

const megaman1 = () => {
  let robotMode = painting
  let i = 0
  let rel = 0

  const getInput = (input, pos, mode) => {
    switch (mode) {
      case 1: {
        return pos
      }
      case 2: {
        return rel + input[pos]
      }
      default: {
        return input[pos]
      }
    }
  }

  while (input[i] !== 99) {

    const opCode = input[i] % 100
    const modeStack = input[i].toString().split('').map(num => Number(num))
    modeStack.pop()
    modeStack.pop()
    let mode = modeStack.length ? modeStack.pop() : 0

    const a = getInput(input, i + 1, mode)
    mode = modeStack.length ? modeStack.pop() : 0
    const b = getInput(input, i + 2, mode)
    mode = modeStack.length ? modeStack.pop() : 0
    const c = getInput(input, i + 3, mode)

    if (input[a] === undefined) { input[a] = 0 }

    if (opCode === 1) {
      if (input[b] === undefined) { input[b] = 0 }
      if (input[c] === undefined) { input[c] = 0 }

      input[c] = input[a] + input[b]
      i += 4
    } else if (opCode === 2) {
      if (input[b] === undefined) { input[b] = 0 }
      if (input[c] === undefined) { input[c] = 0 }

      input[c] = input[a] * input[b]
      i += 4

    } else if (opCode === 3) {
      // const newInput = rl.question('insert INTEGER: ')
      const newInput = gridMap[`${robotX}, ${robotY}`] ? gridMap[`${robotX}, ${robotY}`] : 0
      input[a] = Number(newInput)
      i += 2
    } else if (opCode === 4) {
      const output = input[a]

      if (robotMode === painting) {
        if (gridMap[`${robotX}, ${robotY}`] === undefined) {
          paintedCount++
        }
        gridMap[`${robotX}, ${robotY}`] = output

        robotMode = moving
      } else if (robotMode === moving) {
        switch (robotDir) {
          /*
          [0, 0, 0]
          [#, 1, 0]
          [0, 0, 0]
          */
          case UP: {
            robotDir = output ? RIGHT : LEFT
            robotX += output ? 1 : -1
            break
          } case DOWN: {
            robotDir = output ? LEFT : RIGHT
            robotX += output ? -1 : 1
            break
          } case LEFT: {
            robotDir = output ? UP : DOWN
            robotY += output ? 1 : -1
            break
          } case RIGHT: {
            robotDir = output ? DOWN : UP
            robotY += output ? -1 : 1
            break
          }
          default: {
            break
          }
        }
        robotMode = painting
      }
      i += 2
    } else if (opCode === 5) {
      if (input[b] === undefined) { input[b] = 0 }

      i = input[a] === 0 ? i + 3 : input[b]

    } else if (opCode === 6) {
      if (input[b] === undefined) { input[b] = 0 }

      i = input[a] !== 0 ? i + 3 : input[b]

    } else if (opCode === 7) {
      if (input[b] === undefined) { input[b] = 0 }
      if (input[c] === undefined) { input[c] = 0 }

      const newPosition = input[a] < input[b] ? 1 : 0
      input[c] = newPosition
      i += 4

    } else if (opCode === 8) {
      if (input[b] === undefined) { input[b] = 0 }
      if (input[c] === undefined) { input[c] = 0 }

      const newPosition = input[a] === input[b] ? 1 : 0
      input[c] = newPosition

      i += 4
    } else if (opCode === 9) {
      rel += input[a]
      i += 2
    }
  }
}
megaman1()
console.log('paintedCount:', paintedCount)
// grid.forEach(row => {
//   console.log(row.join())
// })
let drawing = Object.keys(gridMap)
console.log('gridMap:', gridMap)

drawing = drawing.map( a => {
  let newA = a.split(', ')
  newA = newA.map(coord => Number(coord))
  newA.push(gridMap[a])
  return newA
})
// console.log('drawing:', drawing)
drawing = drawing.sort((a, b) => {
  let [ x, y, ] = a
  let [ x2, y2, ] = b
  y = Number(y)
  y2 = Number(y2)
  x = Number(x)
  x2 = Number(x2)
  return y - y2
})

let drawing2 = ''
for (let i = 0; i >= -5; i--) {
  for (let j = 0; j <= 42; j++) {
    if (gridMap[`${j}, ${i}`]) {
      drawing2 += '#'
    } else {
      drawing2 += '.'
    }
  }
  drawing2 += '\n'
}
console.log(drawing2)
let drawing3 = drawing2.split('\n')
drawing3 = drawing3.map(row => row.split(''))
drawing3.forEach(row => {
  console.log(row.join(''))
})

drawing = drawing.map(a => {
  let [ x, y, value, ] = a
  y += 5
  return [ x, y, value, ]
})

// console.log('drawing:', drawing)
// console.log('grid:', grid)
drawing.forEach(panel => {
  const [ x, y, value, ] = panel

  if (value === 1) {
    grid[y][x] = '#'
  } else {
    grid[y][x] = '.'
  }
})
grid.forEach(row => {
  console.log(row.join(''))
})
