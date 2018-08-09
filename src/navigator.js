import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";

import HomeScreen from "./containers/HomeScreen";
import MoviesScreen from "./containers/MoviesScreen";

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Movies: {
    screen: MoviesScreen,
    navigationOptions: () => ({
      title: `Movies`,
      headerStyle: {
        backgroundColor: "#000",
        elevation: null,
        borderBottomColor: `#f8e71c`
      },
      headerTitleStyle: {
        color: `#f8e71c`
      }
    })
  }
});
