import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet
} from "react-native";
import {useSelector} from "react-redux";

import colors from '../../constants/colors';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectProduct = useSelector(state =>
    state.products.availableProducts.find(
      prod => prod.id === productId
    )
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectProduct.imageUrl}} />
      <View style={styles.actions}>
        <Button color={colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
});

export default ProductDetailScreen;
