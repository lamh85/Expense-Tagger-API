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

const csvArray = csvRaw.split(/(\\r\\n|\\n)/).map(row => row.split(','))

const csvHeaderRow = csvArray[0]

const indexTag = csvHeaderRow.length

const csvArrayTagged = csvArray.map(row => {
  const columnsWithLetters = row.filter(column => /[A-Za-z]/.test(column))

  let keywordIndex = null

  // [x  x  x  x[y  y(matches)  y]]

  columnsWithLetters.forEach(column => {
    keywords.forEach((keyword, iterationIndex) => {
      const keywordUpperCase = keyword.toUpperCase()
      if (column.toUpperCase().includes(keywordUpperCase)) {
        keywordIndex = iterationIndex
        break
      }
    })
  })
})