import { createStackNavigator } from "react-navigation";
import HomeScreen from "./containers/HomeScreen";
import MoviesScreen from "./containers/MoviesScreen";

export default createStackNavigator({
  Movies: {
    screen: MoviesScreen
  },
  Home: {
    screen: HomeScreen
  }
});
