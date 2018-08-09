import React from "react";
import { Text, View, Image } from "react-native";
import Container from "../components/Container";
import styled from "styled-components/native";
import logo from "../../assets/images/logo.png";

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
    return (
      <Container>
        <ImageContaner>
          <ResponsiveImage source={logo} resizeMode={"contain"} />
        </ImageContaner>
        <TextBtn onPress={() => alert("YH")}> start!</TextBtn>
      </Container>
    );
  }
}
