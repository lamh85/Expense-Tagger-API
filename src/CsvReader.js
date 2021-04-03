import path from 'path'
import fs from 'fs'

const getFileString = () => {
  const csvPath = path.resolve('csv_input', 'pc_financial.csv')
  const csvBuffer = fs.readFileSync(csvPath)
  return csvBuffer.toString()
}

export const parseCells = row => row.split(',')

export const getCsvArray = () => {
  const fileString = getFileString()
  return fileString.split(/\r\n|\n/).map(parseCells)
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
