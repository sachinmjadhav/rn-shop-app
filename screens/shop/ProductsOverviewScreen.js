import React from "react";
import {StyleSheet, FlatList, Text} from "react-native";
import {useSelector} from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = props => {
  const products = useSelector(
    state => state.products.availableProducts
  );
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
