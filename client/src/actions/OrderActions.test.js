import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import * as actions from '../actions/OrderActions';
import * as types from '../constants/ActionTypes';

let sampleUnpaidOrder = {
    "_id": "5d60f5375811be1a12f54f4e",
    "table": "Table 1",
    "guests": 2,
    "server": "Dylan",
    "__v": 0,
    "bills": [],
    "lastUpdatedAt": "2019-08-24T08:28:39.980Z",
    "createdAt": "2019-08-24T08:28:39.980Z",
    "paid": false,
    "total": 2340,
    "tax": 0,
    "discountAmount": 0,
    "sub_total": 0,
    "items": [
        {
            "charge": 450,
            "quantity": 2,
            "name": "Chips"
        },
        {
            "charge": 1250,
            "quantity": "1",
            "name": "Steak"
        }
    ]
};

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

describe('async addOrder action creator', () => {

  it('creates ADD_ORDER_SUCCESS action when a new order has been created', () => {
    const store = mockStore({ orders: {} });

    // API mock response
    mockAxios.post.mockImplementationOnce(() => 
      Promise.resolve( {data: sampleUnpaidOrder} )
    );

    // Expectation
    const expectedActions = [
      { type: types.ADD_ORDER_REQUEST },
      { type: types.ADD_ORDER_SUCCESS, currentOrder: sampleUnpaidOrder }
    ]

    // Test
    return store.dispatch(actions.addOrder("Table 1")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      mockAxios.post.mockReset(); // Prevents issues with toHaveBeenCalledTimes in other tests
    })
  });

  it('creates ADD_ORDER_FAILURE action when fetching orders has NOT been done', () => {
    const store = mockStore({ orders: {} });
    let errorObj = { errorMsg: "something went wrong" };

    // API mock response
    mockAxios.post.mockImplementationOnce(() => 
      Promise.reject(errorObj)
    );

    // Expectation
    const expectedActions = [
      { type: types.ADD_ORDER_REQUEST },
      { type: types.ADD_ORDER_FAILURE, error: errorObj }
    ]


    // Test
    return store.dispatch(actions.addOrder()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      mockAxios.post.mockReset(); // Prevents issues with toHaveBeenCalledTimes in other tests
    })
  });
})

describe('async loadOrders action creator', () => {
  it('creates LOAD_ORDERS_SUCCESS action when fetching orders has been done', () => {
    const store = mockStore({ orders: {} });

    // API mock response
    mockAxios.get.mockImplementationOnce(() => 
      Promise.resolve({data:[
        sampleUnpaidOrder
      ]})
    )

    // Expectation
    const expectedActions = [
      { type: types.LOAD_ORDERS_REQUEST },
      { type: types.LOAD_ORDERS_SUCCESS, orders: {
        "5d60f5375811be1a12f54f4e": sampleUnpaidOrder
      }}
    ]

    store.dispatch(actions.loadOrders()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      mockAxios.get.mockReset(); // Prevents issues with toHaveBeenCalledTimes in other tests
    })  
  });

  it('creates LOAD_ORDERS_FAILURE action when fetching orders has NOT been done', () => {
    const store = mockStore({ orders: {} });
    let errorObj = { errorMsg: "something went wrong" }

    // API mock response
    mockAxios.get.mockImplementationOnce(() => 
      Promise.reject(errorObj)
    )

    // Expectation
    const expectedActions = [
      { type: types.LOAD_ORDERS_REQUEST },
      { type: types.LOAD_ORDERS_FAILURE, error: errorObj }
    ]

    // Test
    return store.dispatch(actions.loadOrders()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      mockAxios.get.mockReset(); // Prevents issues with toHaveBeenCalledTimes in other tests
    })
  });
})

describe('async updateOrder action creator', () => {
  it('creates UPDATE_ORDER_SUCCESS action when a new order has been updated', () => {
    const store = mockStore({ orders: {} });

    // API mock response
    mockAxios.put.mockImplementationOnce(() => 
      Promise.resolve({ data:sampleUnpaidOrder })
    )

    // Expectation
    const expectedActions = [
      { type: types.UPDATE_ORDER_REQUEST },
      { type: types.UPDATE_ORDER_SUCCESS, 
        orderID: sampleUnpaidOrder._id, 
        updatedOrder: sampleUnpaidOrder }
    ]

    // Test
    return store.dispatch(actions.updateOrder(sampleUnpaidOrder)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
      mockAxios.put.mockReset(); // Prevents issues with toHaveBeenCalledTimes in other tests
    })
  });

  it('creates UPDATE_ORDER_FAILURE action when fetching orders has NOT been done', () => {
    const store = mockStore({ orders: {} });
    let errorObj = { errorMsg: "something went wrong" }

    // API mock response
    mockAxios.put.mockImplementationOnce(() => 
      Promise.reject(errorObj)
    )

    // Expectation
    const expectedActions = [
      { type: types.UPDATE_ORDER_REQUEST },
      { type: types.UPDATE_ORDER_FAILURE, error: errorObj }
    ]

    // Test
    return store.dispatch(actions.updateOrder(sampleUnpaidOrder)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
      mockAxios.put.mockReset(); // Prevents issues with toHaveBeenCalledTimes in other tests
    })
  });
})

describe('async getTables action creator', () => {
  it('creates GET_TABLE action when a new order has been updated', () => {
    const store = mockStore();

    // API mock response
    mockAxios.get.mockImplementationOnce(() => 
      Promise.resolve({data:[sampleUnpaidOrder]})
    )

    // Expectation
    const expectedActions = [
      { type: types.GET_TABLES, 
        unpaidOrdersDic: {
          "Table 1": sampleUnpaidOrder
        }
      }
    ]

    // Test
    return store.dispatch(actions.getTables()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      mockAxios.get.mockReset(); // Prevents issues with toHaveBeenCalledTimes in other tests
    })
  });
})

// STATE TESTS
describe('updateTable action creator', () => {
  it('should create an action to update the given table', () => {
    const tableID = "Table 20";
    const table = { tableID, isOccupied: true, server: "Frank" };
    const expectedAction = {
      type: types.UPDATE_TABLE,
      tableID,
      table,
    }
    expect(actions.updateTable(tableID, table)).toEqual(expectedAction)
  })
})

describe('setTable action creator', () => {
  it('should create an action to change the current table', () => {
    const tableIndex = 5
    const expectedAction = {
      type: types.SET_ACTIVE_TABLE,
      tableIndex
    }
    expect(actions.setTable(tableIndex)).toEqual(expectedAction)
  })
})

// TODO Write a test for saveReceipt


