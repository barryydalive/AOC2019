const fs = require('fs')
const input = fs.readFileSync('day14input.txt').toString().split('\n').map(line => line.split('=> '))
input.pop()

const instructions = {}
input.forEach(instruction => {
  let [ ingredients, concoction, ] = instruction

  ingredients = ingredients.split(', ').map(item => {
    const [ num, name, ] = item.split(' ')
    return { name, amount: Number(num), }
  })
  const [ concAmount, concName, ] = concoction.split(' ')

  concoction = { name: concName, amount: concAmount, }

  instructions[concName] = { ingredients, concoction, }

})
const inventory = {}

const convertor = (name, amount) => {
  let ore = 0
  const recipe = instructions[name]
  const multiplier = Math.ceil(amount / recipe.concoction.amount)

  for (const ingredient of recipe.ingredients) {

    if (ingredient.name === 'ORE') {
      ore += multiplier * ingredient.amount
    } else {
      if (!inventory[ingredient.name]) {
        inventory[ingredient.name] = 0
      }
      if (inventory[ingredient.name] < multiplier * ingredient.amount) {
        ore += convertor(ingredient.name, multiplier * ingredient.amount - inventory[ingredient.name])
      }

      inventory[ingredient.name] -= multiplier * ingredient.amount
    }
  }

  if (!inventory[recipe.concoction.name]) {
    inventory[recipe.concoction.name] = 0
  }
  inventory[recipe.concoction.name] += multiplier * recipe.concoction.amount
  return ore
}
// console.log(convertor('FUEL', 1))
// let brtFrc = 0
// while (convertor('FUEL', brtFrc) <= 1e12) {
//   brtFrc += 10000
// }
// console.log('brtFrc:', brtFrc)

// brtFrc /= 10
// while (convertor('FUEL', brtFrc) <= 1e12) {
//   brtFrc += 1000
// }
// console.log('brtFrc:', brtFrc)

// brtFrc /= 10
// while (convertor('FUEL', brtFrc) <= 1e12) {
//   brtFrc += 100
// }
// console.log('brtFrc:', brtFrc)

// brtFrc /= 10
// while (convertor('FUEL', brtFrc) <= 1e12) {
//   brtFrc += 10
// }
// console.log('brtFrc:', brtFrc)

// brtFrc /= 10
// while (convertor('FUEL', brtFrc) < 1e12) {
//   brtFrc += 1
// }
// console.log('brtFrc:', brtFrc)
console.log('convertor:', convertor('FUEL', 3061522))

// const yes = 1000000000000 / 483766
// console.log('yes:', yes)
const binarySearchForce = () => {
  let minGuess = 0
  let maxGuess = 0

  while (convertor('FUEL', maxGuess) <= 1e12) {
    maxGuess += 1000
  }
  minGuess = maxGuess - 1000
  while (minGuess !== maxGuess) {
    // console.log('maxGuess:', maxGuess)
    const midPoint = minGuess + Math.floor((maxGuess - minGuess) / 2)
    const tryThis = convertor('FUEL', midPoint)
    if (tryThis <= 1e12) {
      minGuess = midPoint
    } else {
      maxGuess = midPoint - 1
    }
  }
  return minGuess
}

console.log('binarySearchForce():', binarySearchForce())
