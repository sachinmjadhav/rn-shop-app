import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import colors from "../../constants/colors";

let TouchableCmp = TouchableOpacity;
if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback;
}

const ProductItem = props => {
  const {image, title, price, onViewDetail, onAddToCart} = props;
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: image}} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                title="View Details"
                color={colors.primary}
                onPress={onViewDetail}
              />
              <Button
                title="To Cart"
                color={colors.primary}
                onPress={onAddToCart}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: 'open-sans',
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  }
});

export default ProductItem;
