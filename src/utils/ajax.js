import { BASE_URL } from "../constants/BaseUrl";

export const getFilms = async (pending, fulfilled, rejected) => {
  try {
    await pending();
    const allFilms = await fetch(`${BASE_URL}films/`);
    const response = await allFilms.json();
    fulfilled(response.results);
  } catch (e) {
    rejected(e);
  }
};

export const fetchCharacters = async (pending, fulfilled, rejected, urls) => {
  try {
    await pending();
    const myCalls = urls.map(url => fetch(url));
    const response = await Promise.all(
      myCalls.map(p => p.then(res => res.json()))
    );
    fulfilled(response);
  } catch (e) {
    rejected(e);
  }
};
