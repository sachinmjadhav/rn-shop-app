import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart";
import CartItem from "../../models/cartItem";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

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

    default:
      return state;
  }
};
