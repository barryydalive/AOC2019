/* eslint-disable guard-for-in */
/* eslint-disable quotes */
/* eslint-disable max-statements */
/* eslint-disable complexity */
const fs = require("fs")
const input = fs
  .readFileSync("./day10input.txt")
  .toString()
  .split("\n")
input.pop()

// function reduce(numerator, denominator) {
//   var gcd = function gcd(a, b) {
//     return b ? gcd(b, a % b) : a;
//   };
//   gcd = gcd(numerator, denominator);
//   return [numerator / gcd, denominator / gcd];
// }

function gcd(x, y) {
  if (typeof x !== "number" || typeof y !== "number") { return false }
  x = Math.abs(x)
  y = Math.abs(y)
  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x
}

// console.log(gcd(-4, 2));

function calcAngleDegrees(y, x) {
  const degrees = Math.atan2(y, x) * 180 / Math.PI
  if (degrees < 0) {
    return 360 + degrees
  }
  return degrees

}

// console.log(calcAngleDegrees(-1, 7) + 90);

const day10 = arr => {
  const foundAsteroids = []

  // locating every asteroid
  for (let row = 0; row < arr.length; row++) {
    for (let height = 0; height < arr[0].length; height++) {
      const beacon = arr[row][height]
      if (beacon === "#") {
        foundAsteroids.push([ row, height, ])
      }
    }
  }

  let maxAsteroids = 0
  let finalAsteroids = new Set()
  let optimal = 0

  foundAsteroids.forEach((asteroid, idx) => {
    const monitored = new Set()
    for (let i = 0; i < foundAsteroids.length; i++) {
      const rise = foundAsteroids[i][0] - asteroid[0]
      const run = foundAsteroids[i][1] - asteroid[1]
      const divisor = gcd(rise, run)

      const slope = `${rise / divisor}/${run / divisor}`
      if (!monitored.has(slope)) {
        monitored.add(slope)
      }
    }

    if (monitored.size > maxAsteroids) {
      maxAsteroids = monitored.size
      finalAsteroids = monitored
      optimal = idx
    }
  })

  finalAsteroids.delete("NaN/NaN")
  const finalAsteroidsArray = []

  finalAsteroids.forEach(point => {
    const coordinates = point.split("/")
    let degrees =
      calcAngleDegrees(Number(coordinates[0]), Number(coordinates[1])) + 90

    if (degrees > 360) {
      degrees -= 360
    }

    finalAsteroidsArray.push([ point, degrees, ])
  })
  console.log('finalAsteroids:', finalAsteroidsArray)
  finalAsteroidsArray.sort((a, b) => a[1] - b[1])
  console.log('finalAsteroids ------>:', finalAsteroidsArray.reverse)

  const stationY = foundAsteroids[optimal][0]
  const stationX = foundAsteroids[optimal][1]

  const difference = finalAsteroidsArray[198][0].split("/")
  const changeInY = Number(difference[0])
  const changeInX = Number(difference[1])
  console.log(stationY, changeInY)
  console.log(stationX, changeInX)
  // console.log("optimal", foundAsteroids[optimal][0]);
  // console.log("finalAsteroidsArray", changeInX, changeInY);
  console.log('finalAsteroids:', finalAsteroidsArray.filter(ast => ast[1] == 360))
}

day10(input)
