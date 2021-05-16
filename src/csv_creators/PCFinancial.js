import { findCategory } from './CategoryFinder.js'

const SOURCE_CSV_INDEX = { VENDOR: 0, DATE: 3, TIME: 4, AMOUNT: 5 }

const SOURCE_CSV_COLUMNS_COUNT = 6

const parseAmount = rawAmount => {
  const removedQuotes = rawAmount.replace(/"/g, '')
  const numberType = parseFloat(removedQuotes)
  return Math.abs(numberType)
}

const parseDate = rawDate => {
  const removedQuotes = rawDate.replace(/"/g, '')
  const parts = removedQuotes.split('/')

  return {
    year: parseInt(parts[2]),
    month: parseInt(parts[0]),
    day: parseInt(parts[1])
  }
}

// sample: "10:17 PM"
const parseTime = rawTime => {
  const withoutQuotes = rawTime.replace(/"/g, '')
  const amOrPm = withoutQuotes.split(' ')[1]
  const twelveHourTime = withoutQuotes.split(' ')[0]
  const hourRaw = twelveHourTime.split(':')[0]

  let hourNormalized = parseInt(hourRaw)

  if (amOrPm === 'PM' && hourNormalized < 12) {
    hourNormalized += 12
  }

  if (amOrPm === 'AM' && hourNormalized === 12) {
    hourNormalized = 0
  }

  const minuteRaw = twelveHourTime.split(':')[1]
  const minute = parseInt(minuteRaw)

  return {
    hour: hourNormalized,
    minute
  }
}

const createTransactionId = ({ sourceDate, sourceTime }) => {
  const { year, month, day } = parseDate(sourceDate)
  const { hour, minute } = parseTime(sourceTime)

  const monthArg = month - 1

  // PC Financial's date-times are already in GMT
  const dateObj = new Date(year, monthArg, day, hour, minute)

  return +dateObj
}

const getVendor = sourceRow => {
  const cell = sourceRow[SOURCE_CSV_INDEX.VENDOR]
  return cell.replace(/"/g, '')
}

export const createPcFinancialCsv = csvArray => {
  const mapped = csvArray.map((sourceRow, index) => {
    if (index === 0) return
    if (!Array.isArray(sourceRow)) return
    if (sourceRow.length !== SOURCE_CSV_COLUMNS_COUNT) return

    const sourceDate = sourceRow[SOURCE_CSV_INDEX.DATE]
    const { day, year, month } = parseDate(sourceDate)

    const sourceTime = sourceRow[SOURCE_CSV_INDEX.TIME]
    const bankTransactionId = createTransactionId({ sourceDate, sourceTime })

    const sourceAmount = sourceRow[SOURCE_CSV_INDEX.AMOUNT]
    const amount = parseAmount(sourceAmount)

    const vendor = getVendor(sourceRow)
    const category = findCategory(vendor)

    const bank = 'PC Financial'

    return { bankTransactionId, day, year, month, amount, vendor, category, bank }
  })

  return mapped.filter(item => ![undefined, null].includes(item))
}
