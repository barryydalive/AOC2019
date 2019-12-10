/* eslint-disable complexity */
const fs = require('fs')
const input = fs.readFileSync('./inputDay5.txt').toString().split(',').map(num => Number(num))
const rl = require('readline-sync')

const megaman1 = () => {
  let i = 0
  while (input[i] !== 99) {
    const opCode = input[i] % 100
    const modeStack = input[i].toString().split('').map(num => Number(num))
    modeStack.pop()
    modeStack.pop()

    let mode = modeStack.length ? modeStack.pop() : 0
    if (opCode === 1) {
      const a = mode === 0 ? input[input[i + 1]] : input[i + 1]
      mode = modeStack.length ? modeStack.pop() : 0
      const b = mode === 0 ? input[input[i + 2]] : input[i + 2]
      input[input[i + 3]] = a + b
      i += 4
    } else if (opCode === 2) {
      const a = mode === 0 ? input[input[i + 1]] : input[i + 1]
      mode = modeStack.length ? modeStack.pop() : 0
      const b = mode === 0 ? input[input[i + 2]] : input[i + 2]
      input[input[i + 3]] = a * b
      i += 4

    } else if (opCode === 3) {
      const newInput = rl.question('insert INTEGER: ')
      input[input[i + 1]] = Number(newInput)
      i += 2
    } else if (opCode === 4) {
      const outPut = mode === 0 ? input[input[i + 1]] : input[i + 1]
      console.log('outPut', outPut)
      i += 2
    } else if (opCode === 5) {

      const a = mode === 0 ? input[input[i + 1]] : input[i + 1]
      mode = modeStack.length ? modeStack.pop() : 0
      const newPosition = mode === 0 ? input[input[i + 2]] : input[i + 2]

      i = a === 0 ? i + 3 : newPosition

    } else if (opCode === 6) {

      const a = mode === 0 ? input[input[i + 1]] : input[i + 1]
      mode = modeStack.length ? modeStack.pop() : 0
      const newPosition = mode === 0 ? input[input[i + 2]] : input[i + 2]

      i = a !== 0 ? i + 3 : newPosition

    } else if (opCode === 7) {

      const a = mode === 0 ? input[input[i + 1]] : input[i + 1]
      mode = modeStack.length ? modeStack.pop() : 0
      const b = mode === 0 ? input[input[i + 2]] : input[i + 2]

      const newPosition = a < b ? 1 : 0
      input[input[i + 3]] = newPosition
      i += 4

    } else if (opCode === 8) {

      const a = mode === 0 ? input[input[i + 1]] : input[i + 1]
      mode = modeStack.length ? modeStack.pop() : 0
      const b = mode === 0 ? input[input[i + 2]] : input[i + 2]

      const newPosition = a === b ? 1 : 0
      input[input[i + 3]] = newPosition
      i += 4
    }
  }
}
megaman1()
