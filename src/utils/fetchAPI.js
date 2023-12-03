export const movieOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmI3MDNiN2Q1YmUxZGIyZGY2YmI3NGU2MDVjYzk2NiIsInN1YiI6IjY0NmUyYjAxMzNhMzc2MDBlNjdjYjQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xwfxm6cwo7OCTz9Fg7hqSxaR9Ny0JMqjy2TO_WIWNsA`,
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
