import fs from fs

const categoriesLookup = {
  'Dine out': ['Cafe DOROTHY'],
  'Food': ['Superstore', 't&t', 't and t']
}

const buildKeywordLookup = categoriesLookup => {
  const keywords = Object.values(categoriesLookup)
  const categories = Object.keys(categoriesLookup)

  const lookup = {}

  keywords.forEach((keywordGroup, keywordGroupIndex) => {
    keywordGroup.forEach(keyword => {
      lookup[keyword] = categories[keywordGroupIndex]
    })
  })

  return lookup
}

const keywordLookup = buildKeywordLookup(categoriesLookup)
const keywords = Object.keys(keywordLookup)
const categories = Object.values(keywordLookup)

const csvRaw = ''

const csvArray = csvRaw.split(/\r\n|\n/).map(row => row.split(','))

const isNumber = testSubject => Number.isInteger(testSubject)

const csvArrayTagged = csvArray.map((row, rowIndex) => {
  if (rowIndex == 0) return row

  const columnsWithLetters = row.filter(column => /[A-Za-z]/.test(column))

  let matchedKeywordIndex = null

  for (let column of columnsWithLetters) {
    // Don't check the other columns if we already match a keyword
    if (isNumber(matchedKeywordIndex)) break

    for (let [keywordIndex, keyword] of keywords.entries()) {
      const keywordUpperCase = keyword.toUpperCase()
      if (column.toUpperCase().includes(keywordUpperCase)) {
        matchedKeywordIndex = keywordIndex
        // Don't check other keywords if already found one
        break
      }
    }
  }

  if (isNumber(matchedKeywordIndex)) {
    const category = categories[matchedKeywordIndex]
    return [...row, category]
  } else {
    return row
  }
})