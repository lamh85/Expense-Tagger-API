import path from 'path'
import fs from 'fs'

const getFileStrings = () => {
// > dir = fs.readdirSync('csv_input')
//   ['coast_capital.csv', 'pc_financial.csv']

  const csvPath = path.resolve('csv_input', 'pc_financial.csv')
  const csvBuffer = fs.readFileSync(csvPath)
  return csvBuffer.toString()
}

export const parseCells = row => {
  const numberCommasRemoved = row.replace(/([0-9]),([0-9])/, '$1$2')
  return numberCommasRemoved.split(',')
}

export const getCsvArray = () => {
  const fileString = getFileStrings()
  const rows = fileString.split(/\r\n|\n/)
  return rows.map(parseCells)
}

const vendorFieldCommonTerms = [
  'description'
]
