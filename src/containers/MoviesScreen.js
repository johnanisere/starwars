import React, { Component } from "react";
import { Picker, Text, View, FlatList } from "react-native";

import logo from "../../assets/images/logo.png";
import TableCells, { TableContent } from "../components/MovieScreen/Table";
import DropDown from "../components/MovieScreen/DropDown";
import { getFilms, fetchCharacters } from "../utils/Ajax";
import {
  calculateHeight,
  genderProcessor,
  getCharacters,
  _keyExtractor
} from "../utils/Helpers";

import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
`;

const MyPicker = styled.Picker`
  width: 100%;
  background-color: #f8e71c;
`;

const DropDownContainer = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
`;

const ContentContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 5% 5%;
  padding-bottom: 0;
`;

const Crawl = styled.Text`
  flex: 1;
  color: #f8e71c;
  font-size: 20px;
  text-align: center;
`;

const ListCont = styled.Text`
  color: white;
`;

const TableContainer = styled.View`
  flex: 1;
`;

const GenderView = styled.View`
  position: relative;
  background-color: #f8e71c;
`;

const DropView = styled.View`
  background-color: #f8e71c;
  height: 100px;
`;

const initialState = {
  selectedMovie: { title: "Click to select a movie" },
  displayGender: true,
  display: false,
  pending: false,
  characterPending: false,
  characters: [],
  error: null,
  crawl: "",
  films: [],
  sortByHeight: false
};

class App extends Component {
  state = {
    ...initialState
  };

  onConfirm = () => {
    this.setState(prevState => ({ confirm: !prevState.confirm }));
  };
  onPending = () => {
    this.setState({ pending: true });
  };
  onCharacterPending = () => {
    this.setState({ characterPending: true });
  };
  onCharacterFulfilled = res => {
    this.setState({ characters: res, characterPending: false });
  };
  onFulfilled = res => {
    this.setState({ pending: false, films: res });
  };
  onRejected = error => {
    this.setState({ pending: false, error });
  };

  onSortHeight = () => {
    const { sortByHeight } = this.state;
    sortByHeight
      ? sortByHeight === "ascending"
        ? this.setState({ sortByHeight: "descending" })
        : this.setState({ sortByHeight: "ascending" })
      : this.setState({ sortByHeight: "ascending" });
  };

  toggleDropDown = () =>
    this.setState(prevState => ({
      display: !prevState.display
    }));

  pickValue = itemValue => {
    this.setState(
      prevState => ({
        selectedMovie: itemValue,
        crawl: prevState.films[itemValue.key].opening_crawl
      }),
      () => {
        fetchCharacters(
          this.onCharacterPending,
          this.onCharacterFulfilled,
          this.onRejected,
          this.state.films[itemValue.key].characters
        ),
          this.toggleDropDown();
      }
    );
  };

  componentDidMount() {
    getFilms(this.onPending, this.onFulfilled, this.onRejected);
  }

  render() {
    const {
      display,
      displayGender,
      selectedMovie,
      pending,
      films,
      error,
      crawl,
      characterPending,
      characters
    } = this.state;

    return (
      <Container>
        {films.length ? (
          <DropDown event={this.toggleDropDown} value={selectedMovie.title} />
        ) : (
          <TableContent content={true}>Loading...</TableContent>
        )}

        {display && (
          <MyPicker
            selectedValue={this.state.selectedMovie}
            onValueChange={itemValue => this.pickValue(itemValue)}
          >
            {films.map((val, key) => (
              <Picker.Item
                key={val.title}
                label={val.title}
                value={{ title: val.title, key: key }}
              />
            ))}
          </MyPicker>
        )}

        {display ||
          (films.length && (
            <ContentContainer>
              <TableContainer>
                <Crawl opening={true}>{pending ? "Loading..." : crawl}</Crawl>
              </TableContainer>

              {characters.length && (
                <TableCells
                  name={"Name"}
                  gender={"Gender"}
                  height={"Height"}
                  nameSpace={2}
                  onHeight={this.onSortHeight}
                />
              )}
              <TableContainer>
                {characterPending ? (
                  <TableContent content={true}>Loading...</TableContent>
                ) : (
                  characters.length && (
                    <FlatList
                      data={getCharacters(this.state)}
                      keyExtractor={_keyExtractor}
                      renderItem={({ item }) => (
                        <TableCells
                          nameSpace={2}
                          name={item.name}
                          gender={genderProcessor(item.gender)}
                          height={item.height}
                          content={true}
                        />
                      )}
                    />
                  )
                )}
              </TableContainer>
              {!characterPending && characters.length ? (
                <TableCells
                  name={characters.length}
                  gender={""}
                  height={calculateHeight(characters)}
                  bottom={true}
                  heightSpace={3}
                />
              ) : (
                <TableCells
                  name={""}
                  gender={""}
                  height={``}
                  content={true}
                  heightSpace={3}
                />
              )}
            </ContentContainer>
          ))}
      </Container>
    );
  }
}

export default App;
