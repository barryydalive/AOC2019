/* eslint-disable complexity */
const rl = require('readline-sync')
const megaman1 = (input, inputs = []) => {
  const outputs = []

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
      let newInput
      if (!inputs.length) {
        console.log('i:', i)
        newInput = rl.question('insert INTEGER: ')
      } else {
        newInput = inputs.shift()
      }
      input[a] = Number(newInput)
      i += 2
    } else if (opCode === 4) {
      const output = input[a]
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
  return outputs
}
module.exports = megaman1
