const fs = require('fs')
const input = fs.readFileSync('day10input.txt').toString().split('\n').map(row => row.split(''))
input.pop()

const getAsteroidCoords = () => {
  const asteroids = []
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === '#') {
        asteroids.push([ row, col, ])
      }
    }
  }
  return asteroids
}
const getGCD = (a, b) => {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return Math.abs(a)
}

const getSlope = (coord1, coord2) => {
  const [ x1, y1, ] = coord1
  const [ x2, y2, ] = coord2
  let diffX = x2 - x1
  let diffY = y2 - y1
  const gcd = getGCD(diffX, diffY)
  diffX /= gcd
  diffY /= gcd

  return [ diffX, diffY, ]
}

const canISeeIt = (slopeX, slopeY, curr, astToSee) => {
  let [ x, y, ] = curr

  const [ x2, y2, ] = astToSee
  x += slopeX
  y += slopeY

  while (input[x] && input[x][y]) {

    if (input[x][y] === '#') {
      if (x === x2 && y === y2) { return true }
      return false
    }
    x += slopeX
    y += slopeY
  }
}
let thatsNoMoon = []
const searchYourFeelings = () => {
  const asteroids = getAsteroidCoords()
  let mostAst = []
  for (let currAst = 0; currAst < asteroids.length; currAst++) {
    const canSee = []
    for (let nextAst = 0; nextAst < asteroids.length; nextAst++) {
      if (currAst === nextAst) { continue }
      const [ slopeX, slopeY, ] = getSlope(asteroids[currAst], asteroids[nextAst])
      if (canISeeIt(slopeX, slopeY, asteroids[currAst], asteroids[nextAst])) {
        canSee.push( asteroids[nextAst])
      }
    }
    if (canSee.length > mostAst.length) {
      mostAst = canSee
      thatsNoMoon = { x: asteroids[currAst][1], y: asteroids[currAst][0], }
    }
  }
  console.log('thatsNoMoon:', thatsNoMoon)
  return mostAst
}
console.log('searchYourFeelings():', searchYourFeelings())

const mapTargets = (station) => {
  let asteroids = searchYourFeelings()

  asteroids = asteroids.map(ast => {
    const [ slopeX, slopeY, ] = getSlope([ station.x, station.y, ], ast)
    return { slopeX, slopeY, x: ast[1], y: ast[0], }
  })

  let startAng
  asteroids.forEach(ast => {
    let ang = Math.atan2(ast.x - station.x, station.y - ast.y)
    if (!startAng) { startAng = ang } else {
      if (ang < startAng) { // ensure that all asteroids are clockwise of the start ast
        ang += Math.PI * 2
      }
    }
    ast.angle = ang // add the angle to the ast
  })
  asteroids = asteroids.sort((a, b)=> a.angle - b.angle)
  return asteroids
}

const mathBlaster = () => {
  const station = thatsNoMoon
  const asteroids = mapTargets(station)
  let boomCount = 0
  let startFound = false
  for (let i = 0; i < asteroids.length; i++) {
    const currAst = asteroids[i]
    if (currAst.x === thatsNoMoon.x && currAst.y === thatsNoMoon.y) {

      asteroids.splice(i, 1)
      i--
      continue
    }

    if (startFound) {
      asteroids.splice(i, 1)
      i--
      boomCount++
      if (boomCount === 200) {
        return currAst
      }
    } else if (currAst.angle === 0) {
      startFound = true
      i--
    }

  }
}

console.log('mathBlaster():', mathBlaster())
