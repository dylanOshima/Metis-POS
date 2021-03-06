
# Restaurant-PoS <hr>
> By [Richard Bates](https://github.com/Richwb), [Jim Reinknecht](https://github.com/CaptainJimmy) and [Richard Debrah](https://github.com/GM456742), 

Forked and updated by [Dylan Oshima](https://github.com/dylanOshima).

Restaurant PoS is a simple React application for managing restaurant seating. It's features include handling orders for multiple guests and receipt printing. Restaurant PoS is lightweight making it easy to run on very low memory systems.

### TODO
- [ ] Finish implementing tests for the tables ~~and orders reducer~~
- [x] Write actionCreators for dishes
- [x] Write actionCreators for inventory
- [x] Write reducer for dishes
- [x] Write reducer for inventory
- [x] Connect redux to react
- [x] Test replacing the order components with redux state
- [ ] Write tests for dishes
- [ ] Write tests for inventory
- [x] Make login more secure
- [x] Refactor the App.js component
- [ ] Add error modal
- [ ] Update code to latest version of `react-bootstrap`
- [ ] Create an endpoint for courses, **courses are just lists of dishes,
  customers can choose to have different options within a course**
- [ ] Create reducer, action, and component for courses
- [ ] Get earnings for a day and other statistics
- [ ] Input to update the courses in the tasting menu and costing
- [ ] Calculate the cost for a dish

### BUGS
- [ ] When the order of the tables in the `GET_TABLES` is switched, the empty
  table gets an id.
- [ ] When you delete a dish in the admin page that existed in an order or a
  dish, removing it becomes weird. - fix: when an item is deleted it must be
  cascaded in all possible references of the item. Also when an item holds
  another item it should only hold a reference, that way if the reference
  cannot be found then it must have been deleted.
- [x] Reset activeTableIndex on logout

### Future Updates

* ~~Managing Servers/Waiters/Waitresses from the front end~~
* ~~Receipt by sms~~
* ~~Coupons and Gift cards integration~~
* Administrative section to manage service, menu, and employees
* ~~SMS integration for waiting~~
* ~~Guest tableside ordering system~~

## Technologies:

* React
* React-Bootstrap
* Node
* create-react-app
* Express
* MongoDB
* Mongoose
* Linux Server Deployed
* NGINX Reverse Proxy
* REST Api
* React Alerts


# Application
## *Main Page*
![main page display](./imagesMD/1.png)

## *Modal for seating new Guests*
![modal for seating new guests](./imagesMD/2.png)

## *Active/Seated Table*
![image showing active table](./imagesMD/3.png)

## *Making Orders*
![ordering for guests](./imagesMD/4.png)

## *Order Submission Confirmation*
![order submission confirmation](./imagesMD/5.png)

## *Current Servers*
![current servers](./imagesMD/6.png)

## *Checking Out Guests*
![checking out guest](./imagesMD/7.png)

## Installation Instructions:

1) Clone Repository to your local drive
2) From your favorite terminal enter `$ cd Restaurant-PoS`
3) Run `$ npm install` to install packages
4) `$ cd client`
5) Run `$ npm install` to install React packages
6) `$ cd ..` into the main app folder
7) In the app folder run `$ npm start` to run the app. Happy Hacking!

## API Routes

### `/` 
* / Renders the main page. *Does NOT return JSON*

### `/checks`
#### GET Routes
 * /checks  returns JSON of all 'checks' entries
 * /checks/paid returns JSON of all paid checks
 * /checks/unpaid returns JSON of all unpaid checks
 * /checks/:id returns single check by ID

#### POST Routes
 * /checks/seat creates a new 'check' or a new gues seating, returns json with ID data

#### PUT Routes
 * /checks/:id Updates check by ID

#### DELETE Routes
 * /checks/delete/:id

### `/menu`
#### GET Routes
 * /menu returns JSON of all menu entries
 * /menu/:section returns JSON of all menu entries by section / category

#### POST Routes
 * /menu/add Creates a new menu entry, returns JSON with ID

#### DELETE Routes
 * /menu/:id Deletes a menu entry by ID

### `/order`
#### GET Routes
 * /order returns JSON of all order entries
 * /order/paid returns JSON of all paid checks
 * /order/unpaid returns JSON of all unpaid checks
 * /order/:id returns single check by ID / category

#### PUT Routes
 * /order/:id Updates check by ID

### `/servers`
#### GET Routes
 * /servers returns JSON of all waitstaff entries
 * /servers/:code Validates the user access code

#### POST Routes
 * /servers/add Creates a new waitstaff/server entry, returns JSON with ID
 
### `/inventory`
#### GET Routes
 * /inventory returns JSON of all inventory entries
 * /inventory/categories returns a JSON of all the unique categories in the inventory

#### POST Routes
 * /inventory/add Creates a new inventory entry, returns JSON with the ID and other information

#### PUT Routes
 * /inventory/:id Updates the inventory with the given id. The body of the request must have: `name`, `unitOfMeasurement`, and `category`

#### DELETE Routes
* /inventory/delete/:id Removes an inventory item with the given id
 
### Dependencies
Restaurant PoS depends on several NPM Packages. Find below the various packages and their versions used. 
Install with `$ npm install`.

* [React](https://reactjs.org/) &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)
 
* [Concurrently](https://www.npmjs.com/package/concurrently) &middot; ![npm license](https://img.shields.io/badge/npm-3.5.1-red.svg)
 
* [MongoDB](https://www.npmjs.com/package/mongodb) &middot; ![GitHub license](https://img.shields.io/badge/mongodb-3.0.1-green.svg)
 
* [Cors](https://www.npmjs.com/package/cors) &middot; ![GitHub license](https://img.shields.io/badge/npm-2.8.4-blue.svg)
 
* [Express](https://www.npmjs.com/package/express) &middot; ![GitHub license](https://img.shields.io/badge/npm-4.15.5-red.svg)
 
* [Mongoose](https://www.npmjs.com/package/mongoose) &middot; ![GitHub license](https://img.shields.io/badge/npm-4.13.7-blue.svg)
 
* [Morgan](https://www.npmjs.com/package/morgan) &middot; ![GitHub license](https://img.shields.io/badge/npm-1.9.0-blue.svg)
  
* [Nodemon](https://www.npmjs.com/package/nodemon) &middot; ![GitHub license](https://img.shields.io/badge/npm-1.14.0-orange.svg)
  
* [React-Bootstrap](https://www.npmjs.com/package/react-bootstrap) &middot; ![GitHub license](https://img.shields.io/badge/npm-0.32.0-green.svg)
 
* [Serve-Favicon](https://www.npmjs.com/package/serve-favicon) &middot; ![GitHub license](https://img.shields.io/badge/npm-2.4.5-blue.svg)
 
* [Axios](https://www.npmjs.com/package/axios) &middot; ![GitHub license](https://img.shields.io/badge/npm-0.17.1-blue.svg)

* [React-Alert](https://www.npmjs.com/package/react-alert) &middot;![GitHub license](https://img.shields.io/npm/v/react-alert.svg?style=flat-square)
 
 

### Installation Instructions:

1. Clone Repository to your local drive
2. From your favorite terminal enter `$ cd Restaurant-PoS`
3. Run `$ npm install` to install packages
4. `$ cd client`
5. Run `$ npm install` to install React packages
6. `$ cd ..` into the main app folder
7. In the app folder run `$ npm start` to run the app. Happy Hacking!
