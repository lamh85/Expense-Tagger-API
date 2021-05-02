import path from 'path'
import fs from 'fs'

const CSV_INPUT_DIRECTORY = 'csv_input'

const getFileString = fileName => {
  const csvPath = path.resolve(CSV_INPUT_DIRECTORY, fileName)
  const csvBuffer = fs.readFileSync(csvPath)
  return csvBuffer.toString()
}

const splitFileStringToCells = fileString => {
  const rows = fileString.split(/\r\n|\n/)

  return rows.map(row => {
    const numberCommasRemoved = row.replace(/([0-9]),([0-9])/, '$1$2')
    return numberCommasRemoved.split(',')
  })
}

export const getCellsByFile = () => {
  const csvDirectoryFileNames = fs.readdirSync(CSV_INPUT_DIRECTORY)
  const csvFileNames = csvDirectoryFileNames.filter(filename => {
    return /\.csv$/.test(filename)
  })

  return csvFileNames.map(fileName => {
    const fileString = getFileString(fileName)
    return splitFileStringToCells(fileString)
  })
}