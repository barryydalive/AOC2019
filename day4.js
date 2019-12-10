const uniquePossibles = (min, max) => {
  let count = 0

  for (let i = min; i <= max; i++) {

    const repeatedDigits = new Set()
    const curr = i.toString()
    let repeating = false
    let possible = true
    let repeatedCharCount = 1

    for (let i = 0; i < curr.length - 1; i++) {
      const currChar = curr[i]
      const nextChar = curr[i + 1]

      if (currChar === nextChar) {
        repeatedCharCount++
      } else { repeatedCharCount = 1 }

      if (repeatedCharCount === 2) { repeatedDigits.add(currChar) }
      if (repeatedCharCount > 2) { repeatedDigits.delete(currChar) }

      if (currChar > nextChar) { possible = false }
    }

    if (repeatedDigits.size) { repeating = true }
    if (repeating && possible) {
      count++
    }

  }
  console.log('count:', count)
}

uniquePossibles(147981, 691423)
