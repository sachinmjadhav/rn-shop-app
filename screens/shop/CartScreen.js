import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import colors from "../../constants/colors";

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Button
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
            color={colors.accent}
          />
        )}
      </Card>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <View>
            <Text style={{ fontSize: 16 }}>Cart Empty.</Text>
          </View>
          <TouchableOpacity
            style={styles.emptyCartButton}
            onPress={() => props.navigation.navigate("ProductsOverview")}
          >
            <Text style={styles.emptyCartButtonText}>Add Items</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <FlatList
            keyExtractor={item => item.productId}
            data={cartItems}
            renderItem={itemData => (
              <CartItem
                id={itemData.item.productId}
                amount={itemData.item.sum}
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                deleteable
                onRemove={() => {
                  dispatch(
                    cartActions.removeFromCart(itemData.item.productId)
                  );
                }}
                onAdd={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: colors.primary
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center"
  },
  emptyCartButton: {
    marginVertical: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.primary
  },
  emptyCartButtonText: {
    fontSize: 16,
    color: colors.primary
  }
});

export default CartScreen;
