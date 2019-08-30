import reducer, { defaultOrder, defaultTables } from './OrderReducer';
import * as types from '../constants/ActionTypes';

let sampleOrder = {
  "_id": "5d60f5375811be1a12f54f4e",
  "table": "Table 2",
  "guests": 2,
  "server": "Dylan",
  "__v": 0,
  "bills": [{
    id: null,
    items: [],
    total: 0.00
  }],
  "lastUpdatedAt": "2019-08-24T08:28:39.980Z",
  "createdAt": "2019-08-24T08:28:39.980Z",
  "paid": true,
  "total": 1700,
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
}

const sampleState = {
  isFetching: false,
  currentOrder: defaultOrder,
  orders: {
    "5d60f5375811be1a12f54f4e": sampleOrder
  },
  error: null,
  tables: [
    {
      name: "Table 1",
      isOccupied: false,
      guestNumber: null,
      server: null,
      pendingOrder: "",
    },
    {
      name: "Table 2",
      isOccupied: false,
      guestNumber: null,
      server: null,
      pendingOrder: "",
    }],
  activeTableIndex: null
};

// STATE TESTS
describe('order reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(Object.assign({}, sampleState, {
      orders: {},
      tables: defaultTables,
    }));
  })
  it('should handle ADD_ORDER_SUCCESS', () => {
    const newOrder = Object.assign({}, sampleOrder, {
      _id: "5d60f5375811be1a12ffffff",
      table: "Table 2",
      server: "Dylan"
    });
    const sampleAction = {
      type:types.ADD_ORDER_SUCCESS, 
      currentOrder: newOrder,
    };
    const expectedState = Object.assign({}, sampleState, {
      isFetching: false,
      orders: {
        "5d60f5375811be1a12f54f4e": sampleOrder, 
        "5d60f5375811be1a12ffffff": newOrder
      },
      tables: [{
          name: "Table 1",
          isOccupied: false,
          guestNumber: null,
          server: null,
          pendingOrder: "",
        },
        {
          name: "Table 2",
          isOccupied: true,
          guestNumber: 2,
          server: "Dylan",
          pendingOrder: "5d60f5375811be1a12ffffff",
        }
      ]
    });
    expect(reducer(sampleState, sampleAction)).toEqual(expectedState);
  })
  it('should handle LOAD_ORDERS_SUCCESS', () => {
    const newOrder = Object.assign({}, sampleOrder, {
      _id: "5d60f5375811be1a12ffffff",
      table: "Table 2",
      server: "Dylan"
    });
    const sampleAction = {
      type:types.LOAD_ORDERS_SUCCESS, 
      orders: {
        "5d60f5375811be1a12f54f4e": sampleOrder, 
        "5d60f5375811be1a12ffffff": newOrder
      }
    };
    const expectedState = Object.assign({}, sampleState, {
      isFetching: false,
      orders: {
        "5d60f5375811be1a12f54f4e": sampleOrder, 
        "5d60f5375811be1a12ffffff": newOrder
      }
    });
    expect(reducer(sampleState, sampleAction)).toEqual(expectedState);
  })
  it('should handle UPDATE_ORDER_SUCCESS', () => {
    const sampleAction = {
      type: types.UPDATE_ORDER_SUCCESS, 
      orderID: sampleOrder._id,
      updatedOrder: sampleOrder
    };
    const expectedState = Object.assign({}, sampleState, {
      isFetching: false,
      orders: { [sampleOrder._id]: sampleOrder}
    });
    expect(reducer(sampleState, sampleAction)).toEqual(expectedState);
  })
  it('should handle GET_TABLES', () => {
    const sampleAction = {
      type: types.GET_TABLES, 
      unpaidOrdersDic: {
        "Table 2": sampleOrder
      }
    };
    const expectedState = Object.assign({}, sampleState, {
      tables: [{
        name: "Table 1",
        isOccupied: false,
        guestNumber: null,
        server: null,
        pendingOrder: "",
      }, {
        name: "Table 2",
        isOccupied: true,
        guestNumber: 2,
        server: "Dylan",
        pendingOrder: "5d60f5375811be1a12f54f4e",
      }]
    });
    expect(reducer(sampleState, sampleAction)).toEqual(expectedState);
  });
  it('should handle UPDATE_TABLE', () => {
    const sampleNewTable = {
      name: "Table 2",
      isOccupied: false,
      guestNumber: null,
      server: null,
      pendingOrder: "",
    };
    const sampleAction = {
      type: types.UPDATE_TABLE, 
      tableID: "Table 2",
      table: sampleNewTable
    };
    const expectedState = Object.assign({}, sampleState, {
      tables: [{
          name: "Table 1",
          isOccupied: false,
          guestNumber: null,
          server: null,
          pendingOrder: "",
        }, sampleNewTable ]
    });
    expect(reducer(sampleState, sampleAction)).toEqual(expectedState);
  });
  it('should handle RESET_TABLE', () => {
    //TODO
  })
  it('should handle SET_ACTIVE_TABLE', () => {
    //TODO
  })
  it('should handle RESET_TABLE', () => {
    //TODO
  })
})

// TODO Write a test for saveReceipt


