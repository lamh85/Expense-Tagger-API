import path from 'path'
import fs from 'fs'

import * as BANKS from './bank_names.js'
import { createPcFinancialCsv } from './csv_creators/PCFinancial.js'
import { createCoastCapitalObjects } from './csv_creators/CoastCapital.js'

const CSV_INPUT_DIRECTORY = 'csv_input'

export const splitFileStringToCells = fileString => {
  const rows = fileString.split(/\r\n|\n/)

  return rows.map(row => {
    const numberCommasRemoved = row.replace(/([0-9]),([0-9])/, '$1$2')
    return numberCommasRemoved.split(',')
  })
}

const identifyBank = cellsOfCsvString => {
  const headerCells = cellsOfCsvString[0]
  // const headerCells = headerRow.split(',')

  let bank
  if (headerCells.length === 5 && headerCells[0].includes('Unique ID')) {
    bank = BANKS.COAST_CAPITAL
  }

  if (headerCells.length === 6 && headerCells[0].includes('Description')) {
    bank = BANKS.PC_FINANCIAL
  }

  return bank
}

const getFileString = fileName => {
  const csvPath = path.resolve(CSV_INPUT_DIRECTORY, fileName)
  const csvBuffer = fs.readFileSync(csvPath)
  return csvBuffer.toString()
}

const createDateString = ({ year, month, day }) => {
  const monthPadded = String(month).padStart(2, '0')
  const dayPadded = String(day).padStart(2, '0')
  return [year, monthPadded, dayPadded].join('-')
}

const run = async () => {
  const csvDirectoryFileNames = fs.readdirSync(CSV_INPUT_DIRECTORY)
  const csvFileNames = csvDirectoryFileNames.filter(filename => {
    return /\.csv$/.test(filename)
  })

  const transactionsByBank = csvFileNames.map(fileName => {
    const fileString = getFileString(fileName)
    const cellsOfCsvString = splitFileStringToCells(fileString)

    const parserLookupKey = identifyBank(cellsOfCsvString)

    return {
      [BANKS.COAST_CAPITAL]: createCoastCapitalObjects,
      [BANKS.PC_FINANCIAL]: createPcFinancialCsv
    }[parserLookupKey](cellsOfCsvString)
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
