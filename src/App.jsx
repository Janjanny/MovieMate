import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShows";
import MovieDetails from "./Pages/movieDetails";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins"].join(),
      fontWeightRegular: 300,
      fontSize: 12,
    },
    palette: {
      primary: {
        light: "#ff453c",
        main: "#e50914",
        dark: "#cb0000",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "#0A0A0A", color: "white" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/tv-shows" element={<TvShows />}></Route>
            <Route path="/movie-details/:id" element={<MovieDetails />}></Route>
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
};
export default App;
