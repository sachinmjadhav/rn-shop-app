import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { useSelector } from "react-redux";

const AddToCartButton = props => {
  const [inCart, setInCart] = useState(false);
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    cartItems[props.id] ? setInCart(true) : setInCart(false);
  }, [cartItems]);
  return (
    <Button
      title={cartItems[props.id] ? "In Cart" : "Add To Cart"}
      disabled={inCart}
      color={props.color}
      onPress={props.onPress}
    />
  );
};

export default AddToCartButton;
