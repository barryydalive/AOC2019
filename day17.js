const intCodeComp = require('./intCodeComputer')
const fs = require('fs')
const input = fs.readFileSync('./day17input.txt', 'utf8').split(',').map(Number)
// input[0] = 2
const part1Input = [ ...input, ]
const outputs = intCodeComp(part1Input)
let map = ''

outputs.forEach(code => {
  map += String.fromCharCode(code)
})

map.split('\n').forEach(thing => console.log(thing))
map = map.split('\n')

// console.log('map:', map)
const intersections = []
for (let y = 1; y < map.length - 1; y++) {
  for (let x = 1; x < map[y].length - 1; x++) {

    const currChar = map[y][x]
    const aboveChar = map[y - 1][x]
    const belowChar = map[y + 1][x]
    const leftChar = map[y][x - 1]
    const rightChar = map[y][x + 2]
    if (currChar === '#') {
      const set = new Set([ aboveChar, belowChar, leftChar, rightChar, ])
      if (set.size === 1) {
        intersections.push([ y, x, ])
      }
    }
  }
}

const sum = intersections.reduce((accum, curr) => {
  return accum + curr[0] * curr[1]
}, 0)

console.log('sum:', sum)

// part2
const part2Input = [ ...input, ]
part2Input[0] = 2

const AsciiConvertor = (char) => {
  if (typeof char === 'string') {
    return char.charCodeAt()
  }
  return char
}
const Pattern = [ 'A', ',', 'B', ',', 'A', ',', 'C', ',', 'B', ',', 'A', ',', 'B', ',', 'C', ',', 'C', ',', 'B', '\n', ].map(AsciiConvertor)
console.log('Pattern:', Pattern)
const A = [ 'L', ',', '1', '2', ',', 'L', ',', '1', '2', ',', 'R', ',', '4', '\n', ].map(AsciiConvertor)
console.log('A:', A)
const B = [ 'R', ',', '1', '0', ',', 'R', ',', '6', ',', 'R', ',', '4', ',', 'R', ',', '4', '\n', ].map(AsciiConvertor)
const C = [ 'R', ',', '6', ',', 'L', ',', '1', '2', ',', 'L', ',', '1', '2', '\n', ].map(AsciiConvertor)

const inputs = [ ...Pattern, ...A, ...B, ...C, 121, 10, ]

const part2Out = intCodeComp(part2Input, inputs)
map = ''
part2Out.forEach(code => {
  const char = String.fromCharCode(code)
  if (code < 10000) {
    map += char
  } else { map += code }
})
console.log('map:', typeof map)
map = map.split('\n\n')
map.forEach((step, index) => {

  setTimeout(function () {
    console.log(step)
    console.log('\n')
  }, index * 100)

})

console.log('part2Out:', part2Out.pop())

