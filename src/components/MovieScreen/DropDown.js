import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styled from "styled-components/native";

const MyDropDown = styled.TouchableOpacity`
  width: ${({ width }) => (width ? width : "90%")};
  background-color: #f8e71c;
  height: 30px;
  display: flex;
  padding: 0 10px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
`;

const PickedItem = styled.Text`
  color: #000;
`;

const DropDown = ({ event, value, width }) => (
  <MyDropDown onPress={event} width={width}>
    <PickedItem>{value}</PickedItem>
  </MyDropDown>
);

export default DropDown;
