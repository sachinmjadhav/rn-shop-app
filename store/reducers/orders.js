import {ADD_ORDER, SET_ORDER} from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        orders: action.payload.orders
      }

    case ADD_ORDER:
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };

    default:
      return state;
  }
};
