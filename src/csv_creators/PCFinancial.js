import { findCategory } from './CategoryFinder.js'

const parseAmount = rawAmount => {
  const removedQuotes = rawAmount.replace(/"/g, '')
  const numberType = parseFloat(removedQuotes)
  return Math.abs(numberType)
}

const parseDate = rawDate => {
  const removedQuotes = rawDate.replace(/"/g, '')
  const parts = removedQuotes.split('/')

  return {
    year: parts[2],
    month: parts[0],
    day: parts[1]
  }
}

const SOURCE_CSV_INDEX = { VENDOR: 0, DATE: 3, AMOUNT: 5 }

const SOURCE_CSV_COLUMNS_COUNT = 6

export const createPcFinancialCsv = csvArray => {
  const mapped = csvArray.map((sourceRow, index) => {
    if (index === 0) return
    if (!Array.isArray(sourceRow)) return
    if (sourceRow.length !== SOURCE_CSV_COLUMNS_COUNT) return

    const sourceDate = sourceRow[SOURCE_CSV_INDEX.DATE]
    const { day, year, month } = parseDate(sourceDate)

    const sourceAmount = sourceRow[SOURCE_CSV_INDEX.AMOUNT]
    const amount = parseAmount(sourceAmount)

    const vendor = sourceRow[SOURCE_CSV_INDEX.VENDOR]
    const category = findCategory(vendor)

    return { day, year, month, amount, vendor, category }
  })

  return mapped.filter(item => ![undefined, null].includes(item))
}
