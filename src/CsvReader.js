import path from 'path'
import fs from 'fs'

const getFileString = () => {
  const csvPath = path.resolve('csv_input', 'coast_capital.csv')
  const csvBuffer = fs.readFileSync(csvPath)
  return csvBuffer.toString()
}

export const parseCells = row => {
  const numberCommasRemoved = row.replace(/([0-9]),([0-9])/, '$1$2')
  return numberCommasRemoved.split(',')
}

export const getCsvArray = () => {
  const fileString = getFileString()
  const rows = fileString.split(/\r\n|\n/)
  return rows.map(parseCells)
}

const vendorFieldCommonTerms = [
  'description'
]

const arrayToRegex = array => {
  const piped = array.join('|')
  return new RegExp(piped, 'gi')
}

export const getVendorIndex = csvArray => {
  const headerRow = csvArray[0]

  const foundIndex = headerRow.findIndex(cell => {
    const pattern = arrayToRegex(vendorFieldCommonTerms)
    return pattern.test(cell)
  })

  if (foundIndex >= 0) return foundIndex

  return null
}
