export const csvToArray = csv => csv.split(/\r\n|\n/).map(row => row.split(','))
