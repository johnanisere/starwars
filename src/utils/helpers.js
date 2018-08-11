// Calculates the sum of heights in feets and inches
export const calculateHeight = data => {
  let ccm = data.reduce((a, c) => {
    const cummulative = c.height === "unknown" ? 0 : Number(c.height);
    return a + cummulative;
  }, 0);
  let cin = ccm * 0.3937008;
  let cft = parseInt(cin / 120);
  let crin = (cin / 120 - parseInt(cin / 120)) * 12;
  return `${ccm} cm (${cft}ft ${round(crin, 2)}in)`;
};

//rounds up numbers with large exponents and make them readable
export const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

export const genderProcessor = val =>
  val === "male"
    ? "M"
    : val === "female"
      ? "F"
      : val === "hermaphrodite"
        ? "H"
        : "";

//sorts characters array
export const getCharacters = state => {
  const { sortByHeight, characters } = state;

  const knownValues = [...characters].filter(val => val.height !== "unknown");
  const UnknownValues = [...characters].filter(val => val.height === "unknown");
  return sortByHeight
    ? sortByHeight === "ascending"
      ? [...knownValues.sort((a, b) => b.height - a.height), ...UnknownValues]
      : [...knownValues.sort((a, b) => a.height - b.height), ...UnknownValues]
    : characters;
};

//appends a key to each list element
export const _keyExtractor = (item, index) => item.url;
