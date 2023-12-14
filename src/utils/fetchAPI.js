export const movieOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmI3MDNiN2Q1YmUxZGIyZGY2YmI3NGU2MDVjYzk2NiIsInN1YiI6IjY0NmUyYjAxMzNhMzc2MDBlNjdjYjQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xwfxm6cwo7OCTz9Fg7hqSxaR9Ny0JMqjy2TO_WIWNsA`,
  },
};

export const showOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmI3MDNiN2Q1YmUxZGIyZGY2YmI3NGU2MDVjYzk2NiIsInN1YiI6IjY0NmUyYjAxMzNhMzc2MDBlNjdjYjQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xwfxm6cwo7OCTz9Fg7hqSxaR9Ny0JMqjy2TO_WIWNsA",
  },
};

export const fetchMovieData = async (url, section, options) => {
  const response = await fetch(`${url}/${section}`, options);
  const data = await response.json();
  return data;
};

export const fetchMovieDetails = async (url, id, options) => {
  const response = await fetch(`${url}/${id}`, options);
  const data = await response.json();
  return data;
};

export const fetchGenres = async (url, api_key) => {
  const response = await fetch(`${url}?apik_key=${api_key}`);
  const data = await response.json();
  return data;
};

export const fetchSearchMovie = async (searchValue, options) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
    options
  );
  const data = await response.json();
  return data;
};

export const fetchSearchTvShow = async (searchValue, options) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${searchValue}&include_adult=false&language=en-US&page=1`,
    options
  );
  const data = await response.json();
  return data;
};
