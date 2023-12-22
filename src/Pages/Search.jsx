import { Box, Typography, Grid, Stack } from "@mui/material";
import MovieCard from "../components/MovieCard";
import TvShowCard from "../components/TvShowCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

import {
  fetchSearchMovie,
  fetchSearchTvShow,
  movieOptions,
  showOptions,
} from "../utils/fetchAPI";

const Search = () => {
  const [category, setCategory] = useState("Movies");
  const [movieResults, setMovieResults] = useState([]);
  const [tvShowResults, setTvShowResults] = useState([]);
  const categories = ["Movies", "Tv Shows"];
  const { query } = useParams();

  // fetch the results
  useEffect(() => {
    // add event for scroll to top
    window.scrollTo(0, 0);
    const fetchResults = async () => {
      try {
        // fetch movie results
        const movieSearchResult = await fetchSearchMovie(query, movieOptions);

        // fetch tv show results
        const tvShowSearchResult = await fetchSearchTvShow(query, showOptions);

        setMovieResults(movieSearchResult.results);
        setTvShowResults(tvShowSearchResult.results);
      } catch (error) {
        console.log("Error while fetching data: ", error);
      }
    };

    fetchResults();
  }, [query]);

  console.log(movieResults);
  console.log(tvShowResults);

  // category handle click
  const handleClick = (category) => {
    setCategory(category);
  };
  return (
    <>
      {Object.keys(movieResults).length > 0 ||
      Object.keys(tvShowResults).length > 0 ? (
        <Box sx={{ minHeight: "100vh" }}>
          <Box
            width={"80%"}
            margin={"0 auto"}
            paddingTop={"8rem"}
            height={"100%"}
          >
            <Typography
              variant="h4"
              color={"primary.main"}
              fontSize={{ xs: "2.5rem", lg: "3rem" }}
              fontWeight={"900"}
              mb={"1rem"}
            >
              SEARCH RESULTS
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
                  {categoryName == "Movies"
                    ? "Movies"
                    : categoryName == "Tv Shows"
                    ? "Tv Shows"
                    : " "}
                </Typography>
              ))}
            </Stack>

            {/* grid results */}
            <Box mt={{ xs: "3rem", md: "5rem" }} mb={"12rem"}>
              <Grid
                container
                columnSpacing={1}
                rowSpacing={{ xs: 4, sm: 5 }}
                justifyContent={"flex-start"}
                width={"100%"}
              >
                {category == "Movies" &&
                  (movieResults.length > 0 ? (
                    movieResults.map((movie, index) => (
                      <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                        <MovieResultCard movie={movie}></MovieResultCard>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No Movies Found.</Typography>
                  ))}

                {category == "Tv Shows" &&
                  (tvShowResults.length > 0 ? (
                    tvShowResults.map((movie, index) => (
                      <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                        <TvShowResultCard movie={movie}></TvShowResultCard>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="h4" fontWeight={"medium"}>
                      No Tv Shows Found.
                    </Typography>
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
export default Search;

const MovieResultCard = ({ movie }) => {
  return (
    <Box width={{ xs: "100%", md: "15rem" }}>
      <Link
        to={`/movie-details/${movie.id}`}
        style={{ textDecoration: "none" }}
      >
        <Box
          width={"100%"}
          height={{ xs: "15rem", sm: "20rem" }}
          mb={"1rem"}
          sx={{
            position: "relative",
            backgroundImage: `url(https://www.themoviedb.org/t/p/original${movie.poster_path})`,
            backgroundColor: "transparent",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
            transition: "all .3s ease",
            "&:hover": {
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Set the white color with low opacity
                zIndex: 1,
              },
              opacity: 0.9, // Set the low opacity for the image on hover
            },
          }}
        >
          <Box
            justifyContent={"flex-end"}
            width={"100%"}
            display={"flex"}
            paddingTop={"8px"}
            paddingRight={"12px"}
            sx={{ color: "white" }}
          >
            <Rating voteAverage={movie.vote_average} />
          </Box>
        </Box>
      </Link>
      <Link
        to={`/movie-details/${movie.id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          fontSize={{ xs: "15px", sm: "21px" }}
          sx={{
            transition: "all 500ms ease",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {movie.title.length > 15
            ? `${movie.title.slice(0, 15)}...`
            : movie.title}
        </Typography>
      </Link>
    </Box>
  );
};

const TvShowResultCard = ({ movie }) => {
  return (
    <Box width={{ xs: "100%", md: "15rem" }}>
      <Link
        to={`/tv-show-details/${movie.id}`}
        style={{ textDecoration: "none" }}
      >
        <Box
          width={"100%"}
          height={{ xs: "15rem", sm: "20rem" }}
          mb={"1rem"}
          sx={{
            position: "relative",
            backgroundImage: `url(https://www.themoviedb.org/t/p/original${movie.poster_path})`,
            backgroundColor: "transparent",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
            transition: "all .3s ease",
            "&:hover": {
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Set the white color with low opacity
                zIndex: 1,
              },
              opacity: 0.9, // Set the low opacity for the image on hover
            },
          }}
        >
          <Box
            justifyContent={"flex-end"}
            width={"100%"}
            display={"flex"}
            paddingTop={"8px"}
            paddingRight={"12px"}
            sx={{ color: "white" }}
          >
            <Rating voteAverage={movie.vote_average} />
          </Box>
        </Box>
      </Link>
      <Link
        to={`/tv-show-details/${movie.id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          fontSize={{ xs: "15px", sm: "21px" }}
          sx={{
            transition: "all 500ms ease",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {movie.name.length > 15
            ? `${movie.name.slice(0, 15)}...`
            : movie.name}
        </Typography>
      </Link>
    </Box>
  );
};
