import {
  getCsvArray,
  getVendorIndex
} from './CsvReader.js'
import { createPcFinancialCsv } from './csv_creators/PCFinancial.js'

// const appendCategories = (csvArray, vendorIndex) => {
//   return csvArray.map((row, rowIndex) => {
    // if (rowIndex == 0) return [...row, 'Category']

    // return [...row, matchedCategory]
//   })
// }

const run = () => {
  const csvArray = getCsvArray()
  // const vendorIndex = getVendorIndex(csvArray)
  // return appendCategories(csvArray, vendorIndex)
  return createPcFinancialCsv(csvArray)
}

console.dir(run(), { 'maxArrayLength': null })
