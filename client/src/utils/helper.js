
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
 * Displays characters in a list format.
 * 
 * params: takes in an array of strings
 */

const MAX_CHARS = 35;
export function displayArray(arr) {
  if(!arr || !arr.length) {return ""}
  let out = arr[0].name,
      i = 1;
  while(i < arr.length && out.length < MAX_CHARS) {
    out += ", " + arr[i].name;
    i++;
  }
  return out
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

export function updateOrderItems(items, menu) {
  return items.map((item) => {
    const menuItemIndex = menu.findIndex(index => index._id === item._id);
    const menuItem = menu[menuItemIndex];
    
    let newItem = Object.assign({}, item, {
      quantity: parseInt(item.quantity,10),
      charge: parseFloat(menuItem.cost,10),
    })

    return newItem;
  })  
}

export function updateTotal(order, menu=null) {
  let sub_total = 0.00;
  let currentOrderList = order.items;

  // Updates the values of the items based on the menu
  if(menu) currentOrderList = updateOrderItems(order.items, menu);

  currentOrderList.forEach(item => {
    sub_total += parseFloat(item.charge)*parseFloat(item.quantity);
  })

  // Cleanup
  sub_total = sub_total.toFixed(2);
  let tax = (sub_total * TAX_AMOUNT).toFixed(2);
  let total = (sub_total - tax).toFixed(2);

  // Store updated info into table object
  return Object.assign({}, order, {
    items: currentOrderList,
    sub_total,
    tax,
    total,
  })
}