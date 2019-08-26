
// params: table - a table object
// return: int: the table number
export function getTableNumber(table) {
  if(table) {
    let { name } = table;
    return parseInt(name[name.length - 1], 10)
  } else {
    console.error("table object is undefined or null")
  }

}