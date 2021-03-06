import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload.product;
      if(!addedProduct.id) {
        addedProduct.id = addedProduct.productId
      }
      const prodPrice = addedProduct.price || addedProduct.productPrice;
      const prodTitle = addedProduct.title || addedProduct.productTitle;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedOrNewCartItem
          },
          totalAmount: state.totalAmount + prodPrice
        };
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedOrNewCartItem
          },
          totalAmount: state.totalAmount + prodPrice
        };
      }

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.payload.pid];
      const currentQuantity = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        // reduce item quantity
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.payload.pid]: updatedCartItem }
      } else {
        // delete item from cart
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.payload.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if(!state.items[action.payload.pid]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = state.items[action.payload.pid].sum;
      delete updatedItems[action.payload.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }

    default:
      return state;
  }
};
