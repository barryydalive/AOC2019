const fs = require('fs')
const layerAmount = 25 * 6
const input = fs.readFileSync('./day8input.txt').toString().replace('\n', '')

const layers = []
for (let i = 0; i < input.length; i += layerAmount) {
  layers.push(input.slice(i, i + layerAmount))
}
console.log('layers:', layers)

const leastZeroLayerCount = { amount: Infinity, layerNum: 0, }

layers.forEach((layer, i) => {
  let currZeroCount = 0
  console.log('layer:', layer)
  layer = layer.split('')
  console.log('layer:', layer)
  layer.forEach(num => {
    if (num === '0') { currZeroCount++ }
  })
  if (leastZeroLayerCount.amount > currZeroCount) {
    console.log('wtf')
    console.log('currZeroCount:', currZeroCount)
    leastZeroLayerCount.amount = currZeroCount
    leastZeroLayerCount.layerNum = i
  }
})

let password
console.log('leastZeroLayerCount:', leastZeroLayerCount)
let ones = 0
let twos = 0
layers[leastZeroLayerCount.layerNum].split('').forEach(num => {
  if (num === '1') {
    console.log('what')
    ones++
  }
  if (num === '2') {
    twos++
  }

  password = ones * twos
})

console.log('password:', password)
// part2
let message = ''

for (let i = 0; i < layerAmount; i++) {
  const letter = ''
  layers.forEach((layer) => {
    let num = layer[i]
    if (num === '0') { num = ' ' }
    console.log('num:', num)
    if (num !== '2' && !message[i]) {
      message += num
    }
  })
}

for (let i = 0; i < message.length; i += 25) {
  message = message.slice(0, i) + '\n' + message.slice(i)
  i++
}
console.log(message)
