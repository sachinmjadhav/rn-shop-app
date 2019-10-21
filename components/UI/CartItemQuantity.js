import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "./Card";

const CartItemQuantity = props => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity
        onPress={props.onRemove}
        style={styles.button}
      >
        <Ionicons
          name={Platform.OS === "android" ? "md-remove" : "ios-remove"}
          size={23}
          color="red"
        />
      </TouchableOpacity>
      <Text style={styles.quantity}>{props.quantity} </Text>
      <TouchableOpacity
        onPress={props.onAdd}
        style={styles.button}
      >
        <Ionicons
          name={Platform.OS === "android" ? "md-add" : "ios-add"}
          size={23}
          color="red"
        />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
    paddingHorizontal: 5
  },
  button: {
    paddingHorizontal: 10
  }
});

export default CartItemQuantity;
