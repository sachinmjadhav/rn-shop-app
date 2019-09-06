import {createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import {Platform} from "react-native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import colors from "../constants/colors";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? colors.primary : ""
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);