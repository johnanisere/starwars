import React from "react";
import { Text, Dimensions } from "react-native";

import styled from "styled-components/native";

const HeaderContainer = styled.View`
  height: ${Dimensions.get("window").height / 20};
  background-color: ${({ content }) => (content ? "transparent" : "#f8e71c")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-left-radius: ${({ content, bottom }) =>
    content || bottom ? 0 : "4px"};
  border-top-right-radius: ${({ content, bottom }) =>
    content || bottom ? 0 : "4px"};
  border-bottom-left-radius: ${({ bottom }) => (bottom ? "4px" : 0)};
  border-bottom-right-radius: ${({ bottom }) => (bottom ? "4px" : 0)};
`;

export const TableContent = styled.Text`
  color: ${({ content }) => (content ? "#f8e71c" : "black")};
  flex: ${({ space }) => (space ? space : 1)};
  text-align: center;
`;

const TableCells = ({
  name,
  gender,
  height,
  content,
  bottom,
  nameSpace,
  genderSpace,
  heightSpace,
  onName,
  onGender,
  onHeight
}) => (
  <HeaderContainer content={content} bottom={bottom}>
    <TableContent content={content} space={nameSpace} onPress={onName}>
      {name}
    </TableContent>

    <TableContent content={content} space={genderSpace} onPress={onGender}>
      {gender}
    </TableContent>
    <TableContent content={content} space={heightSpace} onPress={onHeight}>
      {height}
    </TableContent>
  </HeaderContainer>
);

export default TableCells;
