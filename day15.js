const fs = require('fs')
const input = fs.readFileSync('./day15input.txt', 'utf8').split(',').map(Number)
const intCodeComp = require('./intCodeComputer')

const North = { input: 1, reverse: 2, }
const South = { input: 2, reverse: 1, }
const East = { input: 4, reverse: 3, }
const West = { input: 3, reverse: 4, }

const directions = [ Northth, South, East, West, ]
