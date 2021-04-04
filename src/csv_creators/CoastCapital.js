import { findCategory } from './CategoryFinder.js'

const SOURCE_CSV_INDEX = { VENDOR: 2, DATE: 1, AMOUNT: 3 }

const SOURCE_CSV_COLUMNS_COUNT = 5

const parseDate = rawDate => {
  const removedQuotes = rawDate.replace(/"/g, '')
  const parts = removedQuotes.split('-')

  const monthRaw = parts[0]

  const monthNumber = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  }[monthRaw]

  return {
    year: parseInt(parts[2]),
    month: monthNumber,
    day: parseInt(parts[1])
  }
}

const parseAmount = rawAmount => {
  const removedQuotes = rawAmount.replace(/"/g, '')
  const numberType = parseFloat(removedQuotes)
  return Math.abs(numberType)
}

export const createCoastCapitalObjects = csvArray => {
  const mapped = csvArray.map((sourceRow, index) => {
    console.log('one row -----------')
    console.log(sourceRow)
    console.log(Array.isArray(sourceRow))
    console.log(sourceRow.length)

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