import path from 'path'
import fs from 'fs'

const csvPath = path.resolve('csv_input', 'pc_financial.csv')
const csvBuffer = fs.readFileSync(csvPath)
const csvString = csvBuffer.toString()

export const csvArray = csvString.split(/\r\n|\n/).map(row => row.split(','))
