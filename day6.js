const fs = require('fs')
const gds = require('graph-data-structure')

const input = fs.readFileSync('./day6input.txt').toString().split('\n').filter(e => { if (e !== '') { return true } return false }).map(e => e.split(')'))

const graph = {}

input.forEach(ele => {
  if (!graph[ele[1]]) {
    graph[ele[1]] = [ ele[0], ]
  } else {
    graph[ele[1]].push(ele[0])
  }
})
const DFS = (key) => {
  let steps = 0
  if (!graph[key]) { return 0 }
  graph[key].forEach(subKey => {
    steps += DFS(subKey)
  })
  return 1 + steps
}

let count = 0

for (const key in graph) {
  graph[key].forEach(subKey => {
    count += 1
    if (graph[subKey]) {
      count += DFS(subKey)
    }
  })
}

console.log('count:', count)
// part 2
// turn graph Bi by experimenting in college

for (const planet in graph) {
  graph[planet].forEach(subPlanet => {
    if (!graph[subPlanet]) { graph[subPlanet] = [] }
    graph[subPlanet].push(planet)
  })
}

const BFS = (key) => {
  let steps = 0
  let found = false
  const queue = graph[key]
  const seen = {}
  while (!found && queue.length) {
    const queu2 = [ ...queue, ]
    while (queue.length) {
      const item = queue.shift()
      seen[item] = true
    }
    for (const item of queu2) {
      seen[item] = true
      graph[item].forEach(planet => {
        if (!seen[planet]) {
          seen[planet] = true
          queue.push(planet)
        }
      })
    }
    if (seen.SAN) {
      found = true
      break
    }
    steps += 1
  }
  console.log('steps:', steps)
}

// BFS()
// const newGraph = gds()
// for (const key in graph) {
//   newGraph.addNode(key)
// }
// for (const key in graph) {
//   graph[key].forEach(subKey => {
//     newGraph.addEdge(key, subKey)
//   })
// }
// const min = newGraph.shortestPath('YOU', 'SAN')
// console.log('min:', min.weight)
