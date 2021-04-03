const parseAmount = rawAmount => {
  const removedQuotes = rawAmount.replace(/"/g, '')
  const numberType = parseFloat(removedQuotes)
  return Math.abs(numberType)
}

const parseDate = rawDate => {
  const removedQuotes = rawDate.replace(/"/g, '')
  const parts = removedQuotes.split('/')

  return {
    year: parts[2],
    month: parts[0],
    day: parts[1]
  }
}

const SOURCE_CSV_INDEX = { VENDOR: 0, DATE: 3, AMOUNT: 5 }

const createPcFinancialCsv = csvArray => {
  return csvArray.map((sourceRow, index) => {
    if (index === 0) return

    const sourceDate = sourceRow[SOURCE_CSV_INDEX.DATE]
    const { day, year, month } = parseDate(sourceDate)

    const sourceAmount = sourceRow[SOURCE_CSV_INDEX.AMOUNT]
    const amount = parseAmount(sourceAmount)

    const vendor = sourceRow[SOURCE_CSV_INDEX.VENDOR]

    return { day, year, month, amount, vendor }
  })
}
