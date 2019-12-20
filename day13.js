/* eslint-disable complexity */
const fs = require('fs')
const input = fs.readFileSync('./day13input.txt').toString().split(',').map(num => Number(num))
const rl = require('readline-sync')

const outputs = []

const megaman1 = () => {
  let i = 0
  let rel = 0
  let thing = { x: null, y: null, type: undefined, }
  const game = []
  let ball = {}
  let paddle = {}
  let score = 0

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
      let newInput
      if (ball.x > paddle.x) { newInput = 1 } else if (ball.x < paddle.x) { newInput = -1 } else { newInput = 0 }
      input[a] = Number(newInput)
      i += 2
    } else if (opCode === 4) {
      const output = input[a]
      if (thing.x === null) {
        thing.x = output
      } else if (thing.y === null) {
        thing.y = output
      } else if (thing.type === undefined) {
        thing.type = output
        if (output === 3) {
          paddle = { ...thing, }
        }
        if (output === 4) {
          ball = { ...thing, }
        }
        if (thing.x === -1 && thing.y === 0) {
          score = output
        }
        thing = { x: null, y: null, type: undefined, }
      }
      outputs.push(output)
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
  return score
}
input[0] = 2
console.log('megaman1():', megaman1())// console.log('final output: ', outputs.join(','))
const chunk = 3
const things = []
const board = {}

for (let i = 0; i < outputs.length; i += chunk) {
  const temparray = outputs.slice(i, i + chunk)
  things.push(temparray)
}
const wowCount = 0
things.forEach(thing => {
  const position = [ thing[0], thing[1], ]
  board[JSON.stringify(position)] = thing[2]

})
let count = 0

for (const key in board) {
  if (board[key] === 2) {
    count++

  }
}

console.log('count:', count)

