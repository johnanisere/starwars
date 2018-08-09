import React from "react";
import {
  Picker,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import styled from "styled-components/native";
import logo from "../../assets/images/logo.png";

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
const DropDownContainer = styled.View`
  flex: 1;
  background-color: white;
  width: 100%;
`;
const PickedItem = styled.Text`
  color: #000;
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

const TableContent = styled.Text`
  color: ${({ content }) => (content ? "#f8e71c" : "black")};
  flex: ${({ space }) => (space ? space : 1)};
  text-align: center;
`;

const GenderView = styled.View`
  position: relative;
  background-color: #f8e71c;
`;

const DropView = styled.View`
  background-color: #f8e71c;
  height: 100px;
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

const Dropdown = ({ event, value, width }) => (
  <MyDropDown onPress={event} width={width}>
    <PickedItem>{value}</PickedItem>
  </MyDropDown>
);

export default class App extends React.Component {
  state = {
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

  getCharacters = () => {
    const { sortByHeight, characters } = this.state;

    const knownValues = [...characters].filter(val => val.height !== "unknown");
    const UnknownValues = [...characters].filter(
      val => val.height === "unknown"
    );
    console.log({ knownValues, UnknownValues });
    return sortByHeight
      ? sortByHeight === "ascending"
        ? [...knownValues.sort((a, b) => b.height - a.height), ...UnknownValues]
        : [...knownValues.sort((a, b) => a.height - b.height), ...UnknownValues]
      : characters;
  };

  componentDidMount() {
    getFilms(this.onPending, this.onFulfilled, this.onRejected);
  }
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
        getCharacters(
          this.onCharacterPending,
          this.onCharacterFulfilled,
          this.onRejected,
          this.state.films[itemValue.key].characters
        ),
          this.toggleDropDown();
      }
    );
  };
  genderProcessor = val =>
    val === "male"
      ? "M"
      : val === "female"
        ? "F"
        : val === "hermaphrodite"
          ? "H"
          : "";

  round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  calculateHeight = data => {
    let ccm = data.reduce((a, c) => {
      const cummulative = c.height === "unknown" ? 0 : Number(c.height);
      return a + cummulative;
    }, 0);
    let cin = ccm * 0.3937008;
    let cft = parseInt(cin / 120);
    let crin = (cin / 120 - parseInt(cin / 120)) * 12;
    return `${ccm} cm (${cft}ft ${this.round(crin, 2)}in)`;
  };

  _keyExtractor = (item, index) => item.url;
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
          <Dropdown event={this.toggleDropDown} value={selectedMovie.title} />
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
                      data={this.getCharacters()}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => (
                        <TableCells
                          nameSpace={2}
                          name={item.name}
                          gender={this.genderProcessor(item.gender)}
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
                  height={this.calculateHeight(characters)}
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

const getFilms = async (pending, fulfilled, rejected) => {
  try {
    await pending();
    const allFilms = await fetch("https://swapi.co/api/films/");
    const response = await allFilms.json();
    fulfilled(response.results);
  } catch (e) {
    rejected(e);
  }
};

const getCharacters = async (pending, fulfilled, rejected, urls) => {
  try {
    await pending();
    myCalls = urls.map(url => fetch(url));
    const response = await Promise.all(
      myCalls.map(p => p.then(res => res.json()))
    );
    fulfilled(response);
  } catch (e) {
    rejected(e);
  }
};
