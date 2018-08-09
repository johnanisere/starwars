import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: undefined,
    height: undefined,
    flex: 1
  },
  logoContainer: {
    width: "100%",
    height: 72
  },
  startBtn: {
    color: "#F8E71C"
  }
});
export default styles;
