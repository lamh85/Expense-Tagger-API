import {
  getCsvArray,
  getVendorIndex
} from './CsvReader.js'
import { findCategory } from './CategoryFinder.js'

const appendCategories = (csvArray, vendorIndex) => {
  return csvArray.map((row, rowIndex) => {
    if (rowIndex == 0) return row

    // const columnsWithLetters = row.filter(column => /[A-Za-z]/.test(column))

    // let matchedCategory = null

    const vendor = row[vendorIndex]
    const matchedCategory = findCategory(vendor)

    // for (let column of columnsWithLetters) {
    //   // Don't check the other columns if we already match a keyword
    //   if (matchedCategory != null) break
    //   matchedCategory = findCategory(column)
    // }

    return [...row, matchedCategory]
  })
}

const run = () => {
  const csvArray = getCsvArray()
  const vendorIndex = getVendorIndex(csvArray)
  return appendCategories(csvArray, vendorIndex)
}

console.log(run())
