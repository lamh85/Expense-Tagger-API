import {
  getCsvArray,
  getVendorIndex
} from './CsvReader.js'
import { findCategory } from './CategoryFinder.js'

const csvArray = getCsvArray()

const csvArrayTagged = csvArray.map((row, rowIndex) => {
  if (rowIndex == 0) return row

  // const columnsWithLetters = row.filter(column => /[A-Za-z]/.test(column))

  // let matchedCategory = null

  const vendorIndex = getVendorIndex(csvArray)

  const vendor = row[vendorIndex]
  const matchedCategory = findCategory(vendor)

  // for (let column of columnsWithLetters) {
  //   // Don't check the other columns if we already match a keyword
  //   if (matchedCategory != null) break
  //   matchedCategory = findCategory(column)
  // }

  return [...row, matchedCategory]
})

console.log(csvArrayTagged)
