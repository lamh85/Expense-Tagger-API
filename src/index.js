import {
  getCsvArray,
  getVendorIndex
} from './CsvReader.js'
import { findCategory } from './CategoryFinder.js'

const appendCategories = (csvArray, vendorIndex) => {
  return csvArray.map((row, rowIndex) => {
    if (rowIndex == 0) return [...row, 'Category']

    const vendor = row[vendorIndex]
    const matchedCategory = findCategory(vendor)

    return [...row, matchedCategory]
  })
}

const run = () => {
  const csvArray = getCsvArray()
  const vendorIndex = getVendorIndex(csvArray)
  return appendCategories(csvArray, vendorIndex)
}

console.log(run())
