import { isNumber } from '../NumberHelper.js'

const categoriesLookup = {
  'Dine out': ['Cafe DOROTHY', 'bubble world'],
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

export const findCategory = observed => {
  let matchedKeywordIndex = null

  for (let [keywordIndex, keyword] of keywords.entries()) {
    const keywordUpperCase = keyword.toUpperCase()
    const observedUpperCase = observed.toUpperCase()
    if (observedUpperCase.includes(keywordUpperCase)) {
      matchedKeywordIndex = keywordIndex
      // Don't check other keywords if already found one
      break
    }
  }

  if (!isNumber(matchedKeywordIndex)) return null

  return categories[matchedKeywordIndex]
}
