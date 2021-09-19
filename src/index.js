import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import * as BANKS from './bank_names.js'
import { getCellsByFile } from './input_parser.js'
import { createPcFinancialCsv } from './csv_creators/PCFinancial.js'
import { createCoastCapitalObjects } from './csv_creators/CoastCapital.js'

export const splitFileStringToCells = fileString => {
  const rows = fileString.split(/\r\n|\n/)

  return rows.map(row => {
    const numberCommasRemoved = row.replace(/([0-9]),([0-9])/, '$1$2')
    return numberCommasRemoved.split(',')
  })
}

const identifyBank = cellsOfCsvString => {
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

const createDateString = ({ year, month, day }) => {
  const monthPadded = String(month).padStart(2, '0')
  const dayPadded = String(day).padStart(2, '0')
  return [year, monthPadded, dayPadded].join('-')
}

const getCommandQuery = () => {
  const commandParams = yargs(hideBin(process.argv)).argv

  const columns = commandParams?.columns?.split(',')

  return { columns }
}

const run = async () => {
  const { columns: columnSelected } = getCommandQuery()

  const cellsByFile = getCellsByFile()

  const transactionsByBank = cellsByFile.map(fileCells => {
    const bankName = identifyBank(fileCells)

    return {
      [BANKS.COAST_CAPITAL]: createCoastCapitalObjects,
      [BANKS.PC_FINANCIAL]: createPcFinancialCsv
    }[bankName](fileCells)
  })

  const flattenedTransactions = [].concat(...transactionsByBank)

  const withFormattedDates = flattenedTransactions.map(transaction => {
    return {
      ...transaction,
      date: createDateString(transaction)
    }
  })

  return withFormattedDates.sort((a, b) => {
    if (a.date > b.date) return 1
    if (a.date < b.date) return -1
    return 0
  })
}

console.dir(run(), { 'maxArrayLength': null })

// column options
// bankTransactionId, day, year, month, amount, vendor, category, bank