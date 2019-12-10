
const originalInput = [ 1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 6, 1, 19, 1, 19, 5, 23, 2, 10, 23, 27, 2, 27, 13, 31, 1, 10, 31, 35, 1, 35, 9, 39, 2, 39, 13, 43, 1, 43, 5, 47, 1, 47, 6, 51, 2, 6, 51, 55, 1, 5, 55, 59, 2, 9, 59, 63, 2, 6, 63, 67, 1, 13, 67, 71, 1, 9, 71, 75, 2, 13, 75, 79, 1, 79, 10, 83, 2, 83, 9, 87, 1, 5, 87, 91, 2, 91, 6, 95, 2, 13, 95, 99, 1, 99, 5, 103, 1, 103, 2, 107, 1, 107, 10, 0, 99, 2, 0, 14, 0, ]
let input = [ ...originalInput, ]
const megaman1 = (noun, verb) => {
  input[1] = noun
  input[2] = verb
  for (let i = 0; i < input.length; i += 4) {
    if (input[i] === 99) {
      break
    }
    const opCode = input[i]
    if (opCode === 1) {
      input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]]
    } else if (opCode === 2) {
      input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]]
    }
  }
}

// part1
megaman1(12, 2)
console.log('input[0]:', input[0])

// part2

for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    input = [ ...originalInput, ]
    megaman1(i, j)
    if (input[0] === 19690720) { console.log('100 * input[1] + input[2]:', 100 * input[1] + input[2]) }
  }
}
