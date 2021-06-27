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

const parseDate = rawDate => {

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
}

const getBankTransactionId = ({ sourceRow, bankName }) => {
  if (bankName === BANKS.COAST_CAPITAL) {
    return sourceRow[BANK_PROPERTIES.COAST_CAPITAL.COLUMN_INDEX.TRANSACTION_ID]
  }
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