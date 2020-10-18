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

const csvRaw = ''

const csvArray = csvRaw.split(/(\\r\\n|\\n)/).map(row => row.split(','))

const csvHeaderRow = csvArray[0]

const indexTag = csvHeaderRow.length

const csvArrayTagged = csvArray.map(row => {

})