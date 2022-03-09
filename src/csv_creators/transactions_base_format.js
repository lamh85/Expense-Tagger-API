import * as BANKS from '../bank_names.js'
import { findCategory } from './CategoryFinder.js'

const BANK_PROPERTIES = {
  COAST_CAPITAL: {
    NAME: 'Coast Capital',
    COLUMN_INDEX: {
      TRANSACTION_ID: 0,
      VENDOR: 2,
      DATE: 1,
      AMOUNT: 3
    }
  },
  PC_FINANCIAL: {
    NAME: 'PC Financial',
    COLUMN_INDEX: {
      VENDOR: 0,
      DATE: 3,
      TIME: 4,
      AMOUNT: 5
    }
  }
}

const MONTH_NUMBER_LOOKUP = {
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
}

const getDate = rawDate => {
  const removedQuotes = rawDate.replace(/"/g, '')
  const parts = removedQuotes.split(/[^a-zA-Z0-9]/g)

  const monthRaw = parts[0]
  const containsLetter = !!monthRaw.match(/[A-Za-z]/g)

  let monthNumber = monthRaw
  if (containsLetter) {
    monthNumber = MONTH_NUMBER_LOOKUP[monthRaw]
  }

  return {
    year: parseInt(parts[2]),
    month: monthNumber,
    day: parseInt(parts[1])
  }
}

// sample: "10:17 PM"
const parseTwelveHourTime = rawTime => {
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

const createPCFTransId = sourceRow => {
  const {
    DATE: dateIndex,
    TIME: timeIndex
  } = BANK_PROPERTIES.PC_FINANCIAL.COLUMN_INDEX

  const rawDate = sourceRow[dateIndex]
  const rawTime = sourceRow[timeIndex]

  const { year, month, day } = getDate(rawDate)
  const { hour, minute } = parseTwelveHourTime(rawTime)
  const monthArg = month - 1

  // PC Financial's date-times are already in GMT
  const dateObj = new Date(year, monthArg, day, hour, minute)

  return +dateObj
}

const getBankTransactionId = ({ sourceRow, bankName }) => {
  if (bankName === BANKS.COAST_CAPITAL) {
    return sourceRow[BANK_PROPERTIES.COAST_CAPITAL.COLUMN_INDEX.TRANSACTION_ID]
  }

  return createPCFTransId(sourceRow)
}

const PARSER_LOOKUP = {
  bankTransactionId: getBankTransactionId,
  date: getDate,
  amount: getAmount,
  vendor: getVendor,
  category: getCategory
  // TODO: not sure what to do with this field
  // bank
}

const getBank = cellsOfCsvString => {
  const headerCells = cellsOfCsvString[0]

  let bank
  if (headerCells.length === 5 && headerCells[0].includes('Unique ID')) {
    bank = BANKS.COAST_CAPITAL
  }

  if (headerCells.length === 6 && headerCells[0].includes('Description')) {
    bank = BANKS.PC_FINANCIAL
  }

  return bank
}

const getColumnProperties = columnsSelected => {
  const parserKeys = Object.keys(PARSER_LOOKUP)
  const columnNames = []

  const sourceParsers = columnsSelected.map(columnSelected => {
    let foundParserKey = null

    parserKeys.forEach(parserKey => {
      if (foundParserKey) return

      if (parserKey.toLowerCase() == columnSelected.toLowerCase()) {
        foundParserKey = parserKey
        columnNames.push(parserKey)
      }
    })

    return foundParserKey
  })

  return { columnNames, sourceParsers }
}

const getDate = bank => {

}

const getTransactions = ({ sourceCells, columnsSelected }) => {
  const bankName = getBank(sourceCells)
  const { columnNames, sourceParsers } = getColumnProperties(columnsSelected)

  return sourceCells.map(sourceRow => {
    const row = {}

    columnNames.forEach((columnName, index) => {
      row[columnName] = sourceParsers[index]({ sourceRow, bankName })
    })

    return row
  })
}