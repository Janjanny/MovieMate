import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Pagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import Popular from "../assets/popular-3.jpg";
import { afterOverlay } from "../utils/customStyles";
import { fetchMovieData, movieOptions, showOptions } from "../utils/fetchAPI";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Movies = () => {
  const backdropPath = "https://www.themoviedb.org/t/p/original";
  const categories = ["popular", "now_playing", "top_rated", "upcoming"];
  const [featured, setFeatured] = useState();
  const [category, setCategory] = useState("popular");
  const [movieList, setMovieList] = useState([]);

  // category handle click
  const handleClick = (category) => {
    setCategory(category);
  };

  // fetch featured
  useEffect(() => {}, []);

  // fetch movie
  useEffect(() => {
    // add event for scroll to top
    window.scrollTo(0, 0);
    //
    try {
      const fetchMovies = async () => {
        const movieDataList = await fetchMovieData(
          "https://api.themoviedb.org/3/movie",
          category,
          movieOptions
        );

        // fetch each details for each shows
        const fetchMoviesDetails = movieDataList.results.map(async (movie) => {
          const details = await fetchMovieData(
            `https://api.themoviedb.org/3/movie`,
            `${movie.id}?language=en-US`,
            showOptions
          );

          return details;
        });

        // wait for all details fetch to complete
        const allDetails = await Promise.all(fetchMoviesDetails);
        // console.log(allDetails);

        // combine the movie datas with its details
        const movieCompleteDetails = movieDataList.results.map(
          (movie, index) => ({
            ...movie,
            movieDetails: allDetails[index],
          })
        );

        setMovieList(movieCompleteDetails);
        setFeatured(movieCompleteDetails[0]);
      };

      fetchMovies();
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  }, [category]);
  console.log("Movies movie list: ", movieList);
  return (
    <>
      {Object.keys(movieList).length > 0 ? (
        <Box height={"fit-content"} pb={"5rem"}>
          <Box
            className="hero-banner"
            width={"100%"}
            height={"80vh"}
            overflow={"hidden"}
            position={"relative"}
            sx={{
              backgroundImage: `url('${backdropPath}${featured.backdrop_path}')`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              "&::before": afterOverlay,
              transition: "400ms ease-in",
            }}
          >
            <Box
              className="featured-text"
              height={"100%"}
              position={"relative"}
              zIndex={10}
              display={"flex"}
              flexDirection={"column"}
              p={{ xs: "0 3%", md: "0 10%" }}
              justifyContent="flex-end"
            >
              <Box mb={"3rem"}>
                <Typography
                  textTransform={"uppercase"}
                  fontSize={{ xs: ".7rem", md: ".8rem" }}
                >
                  Featured Movie
                </Typography>
                <Typography
                  fontSize={{ xs: "2.8rem", md: "3.5rem" }}
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                >
                  {featured.title}
                </Typography>
                <Typography
                  width={"65%"}
                  fontSize={{ xs: ".7rem", md: ".8rem" }}
                  display={{ xs: "none", md: "block" }}
                >
                  {featured.overview}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* movie section */}
          <Box
            className="movie-section"
            width={{ xs: "90%", lg: "80%" }}
            margin={"10rem auto"}
          >
            <Typography
              variant="h4"
              color={"primary"}
              fontSize={{ xs: "2.5rem", lg: "3rem" }}
              fontWeight={"900"}
              mb={"1rem"}
            >
              MOVIES
            </Typography>
            <hr
              style={{
                backgroundColor: "#E50914",
                height: "1px",
                border: "none",
              }}
            />
            <Stack
              direction={"row"}
              gap={{ xs: "12px", sm: "32px" }}
              mt={"2rem"}
              alignItems={"center"}
            >
              {categories.map((categoryName, index) => (
                <Typography
                  key={index}
                  fontWeight={category == categoryName ? "bold" : "regular"}
                  color={category == categoryName ? "primary.main" : "white"}
                  onClick={() => {
                    handleClick(categoryName);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#bdbdbd",
                    },
                  }}
                >
                  {categoryName == "popular"
                    ? "Popular"
                    : categoryName == "now_playing"
                    ? "Now Playing"
                    : categoryName == "top_rated"
                    ? "Top Rated"
                    : categoryName == "upcoming"
                    ? "Upcoming"
                    : " "}
                </Typography>
              ))}
            </Stack>

            {/* movie cards */}
            <Box mt={{ xs: "3rem", md: "5rem" }}>
              <Grid
                container
                columnSpacing={1}
                rowSpacing={{ xs: 4, sm: 5 }}
                justifyContent={"center"}
                width={"100%"}
              >
                {movieList?.map((movie, index) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                    <MovieCard
                      title={movie.title}
                      genres={movie.movieDetails.genres}
                      release_date={movie.release_date}
                      runtime={movie.movieDetails.runtime}
                      backdrop={movie.poster_path}
                      rating={movie.movieDetails.vote_average}
                      id={movie.id}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display={"grid"}
          width={"100%"}
          height={"100vh"}
          sx={{ placeItems: "center" }}
        >
          <Loader />
        </Box>
      )}
    </>
  );
};
export default Movies;
