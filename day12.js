const moonA = { x: 15, y: -2, z: -6, }
const moonB = { x: -5, y: -4, z: -11, }
const moonC = { x: 0, y: -6, z: 0, }
const moonD = { x: 5, y: 9, z: 6, }

const moons = [ moonA, moonB, moonC, moonD, ]

const moonAVel = { x: 0, y: 0, z: 0, }
const moonBVel = { x: 0, y: 0, z: 0, }
const moonCVel = { x: 0, y: 0, z: 0, }
const moonDVel = { x: 0, y: 0, z: 0, }

const moonVelos = [ moonAVel, moonBVel, moonCVel, moonDVel, ]

const calcVelo = () => {
  moons.forEach((moon, i) => {
    moons.forEach((nextMoon, j) => {
      if (i !== j) {
        if (moon.x > nextMoon.x) {
          moonVelos[i].x--
        } else if (moon.x < nextMoon.x) {
          moonVelos[i].x++
        }
        if (moon.y > nextMoon.y) {
          moonVelos[i].y--
        } else if (moon.y < nextMoon.y) {
          moonVelos[i].y++
        }
        if (moon.z > nextMoon.z) {
          moonVelos[i].z--
        } else if (moon.z < nextMoon.z) {
          moonVelos[i].z++
        }
      }
    })
  })
}
const moveTheMoons = () => {
  moons.forEach((moon, i) => {
    moon.x += moonVelos[i].x
    moon.y += moonVelos[i].y
    moon.z += moonVelos[i].z
  })
}

for (let i = 0; i < 1000; i++) {
  calcVelo()
  moveTheMoons()
}

let moonPEs = [ ...moons, ]
let moonKEs = [ ...moonVelos, ]

const getEnergy = () => {
  moonPEs = moonPEs.map(moon => {
    return Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z)
  })

  moonKEs = moonKEs.map(moon => {
    return Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z)
  })

  const totalEnergies = moonPEs.map((moon, i) => {
    const moonKE = moonKEs[i]
    return moon * moonKE
  })

  const returnValue = totalEnergies.reduce((accum, curr) => {
    return accum + curr
  }, 0)

  return returnValue
}

console.log('getEnergy():', getEnergy())
// part2

const stepsToRepeatAxis = (x, arr, arr2) => {
  let steps = 0
  const seen = {}
  let axisessssss = arr.map((moon, i)=> [ moon[x], arr2[i][x], ])
  while (!seen[JSON.stringify(axisessssss)]) {
    steps++
    seen[JSON.stringify(axisessssss)] = true
    calcVelo()
    moveTheMoons()
    axisessssss = arr.map((moon, i)=> [ moon[x], arr2[i][x], ])
  }
  return steps
}

function gcd2(a, b) {
  // Greatest common divisor of 2 integers
  if (!b) { return b === 0 ? a : NaN }
  return gcd2(b, a % b)
}

function lcm2(a, b) {
  // Least common multiple of 2 integers
  return a * b / gcd2(a, b)
}

function lcm(array) {
  // Least common multiple of a list of integers
  let n = 1
  for (let i = 0; i < array.length; ++i) { n = lcm2(array[i], n) }
  return n
}

const accordingToMyCalculations = () => {
  const xPosSteps = stepsToRepeatAxis('x', moons, moonVelos)
  const yPosSteps = stepsToRepeatAxis('y', moons, moonVelos)
  const zPosSteps = stepsToRepeatAxis('z', moons, moonVelos)
  const nums = [ xPosSteps, yPosSteps, zPosSteps, ]

  return lcm(nums)
}

console.log('accordingToMyCalculations:', accordingToMyCalculations())
