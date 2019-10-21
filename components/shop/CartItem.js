import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CartItemQuantity from "../UI/CartItemQuantity";

const CartItem = props => {
  const cartItems = useSelector(state => state.cart.items);
  const currentItem = cartItems[props.id];
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        {!props.deleteable && (
          <Text style={styles.quantity}>{props.quantity} </Text>
        )}
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount}</Text>
        {props.deleteable && (
          <CartItemQuantity
            quantity={props.quantity}
            onRemove={props.onRemove}
            onAdd={props.onAdd}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  }
});

export default CartItem;
