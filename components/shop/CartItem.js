import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CartItemQuantity from "../UI/CartItemQuantity";

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{props.amount.toFixed(2)}</Text>
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
  itemData: {
    flexDirection: "row",
    alignItems: "center"
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  }
});

export default CartItem;
