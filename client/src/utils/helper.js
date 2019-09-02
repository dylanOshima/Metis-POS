
/**
 * params: table - a table object
 * return: int: the table number
 */
export function getTableNumber(table) {
  if(table) {
    let { name } = table;
    return parseInt(name[name.length - 1], 10)
  } else {
    console.error("table object is undefined or null")
  }
}

/** 
 * Updates an order to include all costing information
 * params: an order object, a list of menu object
 * return: an order object with updated values
 * 
 * TODO: Handle discounts and tax
 * TODO: Migrate this to backend
 */

const TAX_AMOUNT = 0.12; // PUT IN CONFIG

export function updateTotal(order, menu) {
  let sub_total = parseFloat(order.total);
  let currentOrderList = order.items.map((item) => {
    const menuItemIndex = menu.findIndex(index => index._id === item._id);
    const menuItem = menu[menuItemIndex];
    
    let newItem = Object.assign({}, item, {
      quantity: parseInt(item.quantity,10),
      charge: ((parseInt(item.quantity) * parseFloat(menuItem.cost)).toFixed(2)),
    })

    sub_total += parseFloat(newItem.charge);
    return newItem;
  })  

  // Cleanup
  let tax = (sub_total * TAX_AMOUNT).toFixed(2);
  let total = (sub_total - tax).toFixed(2);
  sub_total = sub_total.toFixed(2);

  // Store updated info into table object
  return Object.assign({}, order, {
    items: currentOrderList,
    sub_total,
    tax,
    total,
  })
}