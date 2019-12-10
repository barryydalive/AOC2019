
/* eslint-disable complexity */
const fs = require('fs')
const input = fs.readFileSync('./day7input.txt').toString().split(',').map(num => Number(num))

const megaman1 = (phase, input, prevOutput,) => {
  const outPutStack = [ 0, ]
  let inputCount = 0
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
      ++inputCount
      const newInput = inputCount % 2 ? phase : prevOutput
      input[input[i + 1]] = Number(newInput)
      i += 2
    } else if (opCode === 4) {
      const outPut = mode === 0 ? input[input[i + 1]] : input[i + 1]
      outPutStack.push(outPut)
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
  return outPutStack.pop()
}
// megaman1()

const permutator = (inputArr) => {
  const result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

const phases = [ 0, 1, 2, 3, 4, ]
const possiblePhases = permutator(phases)
let highest = 0

possiblePhases.forEach(phase => {
  let output = 0
  while (phase.length) {
    const tempInput = [ ...input, ]
    output = megaman1(phase.shift(), tempInput, output)
  }

  if (output > highest) { highest = output }
})

console.log('highest:', highest)
const fbMode = [ 5, 6, 7, 8, 9, ]
const fbModePhases = permutator(fbMode)

const fbMegaman1 = (amp, prevOutput) => {
  const input = amp.input
  const outPutStack = [ 0, ]
  let i = amp.i
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
      if (!prevOutput.length) {
        amp.i = i
        amp.input = input
        return
      }
      const newInput = prevOutput.shift()
      input[input[i + 1]] = Number(newInput)
      i += 2
    } else if (opCode === 4) {
      const outPut = mode === 0 ? input[input[i + 1]] : input[i + 1]
      amp.output.push(outPut)
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
  amp.terminated = true
  return outPutStack[outPutStack.length - 1]
}

let newHighest = 0

const FEEDBACKMODE = ( amps) => {

  while (!amps[4].terminated) {
    amps.forEach((amp, i) => {
      const prevAmp = i === 0 ? amps[4] : amps[i - 1]
      fbMegaman1(amp, prevAmp.output)
    })
  }
}

fbModePhases.forEach(phase => {
  const ampA = { input: [ ...input, ], i: 0, terminated: false, phase: 0, name: 'A', output: [ phase[1], ], }
  const ampB = { input: [ ...input, ], i: 0, terminated: false, phase: 0, name: 'B', output: [ phase[2], ], }
  const ampC = { input: [ ...input, ], i: 0, terminated: false, phase: 0, name: 'C', output: [ phase[3], ], }
  const ampD = { input: [ ...input, ], i: 0, terminated: false, phase: 0, name: 'D', output: [ phase[4], ], }
  const ampE = { input: [ ...input, ], i: 0, terminated: false, phase: 0, name: 'E', output: [ phase[0], 0, ], }

  const amps = [ ampA, ampB, ampC, ampD, ampE, ]
  FEEDBACKMODE(amps)
  if (ampE.output[0] > newHighest) {
    newHighest = ampE.output[0]
  }
})

console.log('newHighest:', newHighest)
