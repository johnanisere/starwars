import React from "react";
import { Text, View, Image } from "react-native";

import logo from "../../assets/images/logo.png";

import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ImageContaner = styled.View`
  width: 100%;
  height: 72;
`;
const TextBtn = styled.Text`
  color: #f8e71c;
  margin-top: 15px;
`;
const ResponsiveImage = styled.Image`
  width: 100%;
  height: 100%;
  flex: 1;
`;

export default class App extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <ImageContaner>
          <ResponsiveImage source={logo} resizeMode={"contain"} />
        </ImageContaner>
        <TextBtn onPress={() => navigate("Movies")}>start!</TextBtn>
      </Container>
    );
  }
}
