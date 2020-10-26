const formatCell = raw => `"${raw}"`

const rowsOfStrings = csvArray => {
  return csvArray.map(row => {
    const cells = row.map(column => formatCell(column))
    return cells.join(',')
  })
}

export const createCsv = csvArray => {
  const rows = rowsOfStrings(csvArray)
  return rows.join('\r\n')
}
