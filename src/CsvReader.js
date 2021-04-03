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

  // console.log('headerRow ===============')
  // console.log(headerRow)
  // const cells = headerRow.map(parseCells)
  // console.log('cells =================')
  // console.log(cells)

  const foundIndex = headerRow.findIndex(cell => {
    console.log('=============')
    console.log(cell)
    console.log(cell.toUpperCase())
    const pattern = arrayToRegex(vendorFieldCommonTerms)
    return pattern.test(cell)
  })

  console.log('foundIndex ===============')
  console.log(foundIndex)

  if (foundIndex >= 0) return foundIndex
  console.log('did not find index')
  return null
}
