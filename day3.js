const fs = require('fs')

const [ wire1Dir, wire2Dir, ] = fs.readFileSync('./day3Input.txt', ).toString().split('\n').map(wire => {
  return wire.split(',')
})

const goVert = (distance, direction, wire, pos) => {
  for (let i = 0; i < distance; i++) {
    pos[0] += direction === 'U' ? 1 : -1
    wire.push(pos.toString())
  }
}

const goHori = (distance, direction, wire, pos) => {
  for (let i = 0; i < distance; i++) {
    pos[1] += direction === 'R' ? 1 : -1
    wire.push(pos.toString())
  }
}

const dontCrossStreams = () => {
  const firstWire = [ ]
  const secondWire = [ ]
  let currPos = [ 0, 0, ]
  wire1Dir.forEach(dir => {
    const direction = dir.slice(0, 1)
    const distance = dir.slice(1)

    switch (direction) {
      case 'U':
        goVert(distance, direction, firstWire, currPos)
        break
      case 'D':
        goVert(distance, direction, firstWire, currPos)
        break
      case 'R':
        goHori(distance, direction, firstWire, currPos)
        break
      case 'L':
        goHori(distance, direction, firstWire, currPos)
        break
      default:
        break
    }
  })
  // reset position to start
  currPos = [ 0, 0, ]
  wire2Dir.forEach(dir => {
    const direction = dir.slice(0, 1)
    const distance = dir.slice(1)

    switch (direction) {
      case 'U':
        goVert(distance, direction, secondWire, currPos)
        break
      case 'D':
        goVert(distance, direction, secondWire, currPos)
        break
      case 'R':
        goHori(distance, direction, secondWire, currPos)
        break
      case 'L':
        goHori(distance, direction, secondWire, currPos)
        break
      default:
        break
    }
  })
  const secondWireSet = new Set(secondWire)

  const intersections = firstWire.filter(coor => secondWireSet.has(coor))

  const closestIntersection = { distance: Infinity, coord: null, }

  intersections.forEach(intersection => {
    const [ x, y, ] = intersection.split(',').map(coord => Math.abs(Number(coord)))
    if (x + y < closestIntersection.distance) {
      closestIntersection.distance = x + y
      closestIntersection.coord = [ x, y, ]
    }
  })

  console.log('closestIntersection.distance:', closestIntersection.distance)

  // part2
  // const closestIntersectionWirePath = { distance: Infinity, coord: null, }
  // intersections.forEach(intersection => {
  //   const numOfStepsWire1 = firstWire.indexOf(intersection) + 1
  //   const numOfStepsWire2 = secondWire.indexOf(intersection) + 1

  //   if (numOfStepsWire1 + numOfStepsWire2 < closestIntersectionWirePath.distance) {
  //     closestIntersectionWirePath.distance = numOfStepsWire1 + numOfStepsWire2
  //     closestIntersectionWirePath.coord = intersection
  //   }
  // })

  // console.log('closestIntersectionWirePath.distance:', closestIntersectionWirePath.distance)
}

dontCrossStreams()

