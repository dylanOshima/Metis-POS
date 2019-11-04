import axios from 'axios';

//-------- Setup
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4444'
                  :'https://metis-pos.herokuapp.com/';
const client = axios.create({
  baseURL,
  // timeout: 5000,
});
console.log("Connected to: ", baseURL);

client.defaults.headers.post['Content-Type'] = 'application/json'

//------- Client Functions
export const setAPIToken = token => {
  client.defaults.headers.common['x-access-token'] = token;
}
export const resetAPIToken = () => {
  delete client.defaults.headers.common['x-access-token'];
}

//-------- Server API calls
const login = payload => client.post(`/servers/login/`, payload);
const getServers = () => client.get("/servers");
const deleteServer = server => client.delete(`/server/${server._id}`)
const putServer = server => client.put(`/server/${server._id}`);
const postServer = server => client.post("/servers/add", server)
//-------- Order API calls
const postOrder = seating => client.post("/check/seat", seating);
const getOrders = () => client.get("/order");
const putOrder = order => client.put(`/order/${order._id}`, order);
const putDishOrder = order => client.put(`/order/items/${order._id}`, order);
const checkout = order => client.put(`/check/${order._id}`, order);
const getUnpaidOrders = () => client.get("/check/unpaid");
//-------- Inventory API calls
const postInventory = entry => client.post("/inventory/add", entry);
const getInventory = () => client.get("/inventory");
const putInventory = entry => client.put(`/inventory/${entry._id}`, entry);  
const deleteInventory = id => client.delete(`/inventory/delete/${id}`);
const getInventoryCategories = () => client.get('/inventory/categories/');
const updateHistory = entry => client.put(`/inventory/history/${entry._id}`, entry);
//-------- Menu API calls
const getMenu = () => client.get("/menu");
const getMenuCategories = () => client.get('/menu/categories/');
const postMenu = dish => client.post("/menu/add", dish);
const putMenu = dish => client.put(`/menu/${dish._id}`, dish); 
const deleteMenu = id => client.delete(`/menu/delete/${id}`);
//-------- Course API calls
const getCourses = () => client.get("/course");
const postCourse = course => client.post("/course/", course);
const putCourse = course => client.put(`/course/${course._id}`, course); 
const deleteCourse = id => client.delete(`/course/delete/${id}`);
  
export const orderCalls = {
  postOrder,
  getOrders,
  putOrder,
  putDishOrder,
  checkout,
  getUnpaidOrders
}
export const server = {
  login,
  deleteServer,
  putServer,
  postServer,
  getServers
}
export const inventoryCalls = {
  postInventory,
  getInventory,
  putInventory,
  deleteInventory,
  getInventoryCategories,
  updateHistory,
}
export const menuCalls = {
  getMenu,
  getMenuCategories,
  postMenu,
  putMenu,
  deleteMenu
}
export const courseCalls = {
  getCourses,
  postCourse,
  putCourse,
  deleteCourse
}