import fs from fs
import { isNumber } from './NumberHelper.js'
import { findCategory } from './CategoryFinder.js'
import { csvToArray } from './CsvFormatter.js'

const csvRaw = ''

const csvArray = csvToArray(csvRaw)

const csvArrayTagged = csvArray.map((row, rowIndex) => {
  if (rowIndex == 0) return row

  const columnsWithLetters = row.filter(column => /[A-Za-z]/.test(column))

  let matchedCategory = null

  for (let column of columnsWithLetters) {
    // Don't check the other columns if we already match a keyword
    if (matchedCategory != null) break
    matchedCategory = findCategory(column)
  }

  return [...row, matchedCategory]
})
