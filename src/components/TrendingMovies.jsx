import { Box, Typography, Stack, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Popular1 from "../assets/popular-1.jpg";
import { useState, useEffect } from "react";
import Rating from "./Rating";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";
import {
  fetchMovieData,
  movieOptions,
  fetchMovieDetails,
  fetchGenres,
} from "../utils/fetchAPI";
import Runtime from "./Runtime";

const TrendingMovies = () => {
  const api_key = "2bb703b7d5be1db2df6bb74e605cc966";
  const genreList = ["Drama", "History"];

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    try {
      // fetch trending movies
      const fetchMovieAndGenre = async () => {
        const movies = await fetchMovieData(
          "https://api.themoviedb.org/3/trending/movie",
          "day",
          movieOptions
        );

        // fetch details for each movies
        const fetchDetails = movies.results.map(async (movie) => {
          const genres = await fetchMovieDetails(
            "https://api.themoviedb.org/3/movie",
            `${movie.id}`,
            movieOptions
          );

          return genres;
        });

        // wait for all details fetch to complete
        const allDetails = await Promise.all(fetchDetails);

        // combine the movie datas with its details
        const moviesWithGenres = movies.results.map((movie, index) => ({
          ...movie,
          movieDetails: allDetails[index],
        }));

        setMovieList(moviesWithGenres.slice(5, 8));
      };

      fetchMovieAndGenre();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  console.log("movieList : ", movieList);
  return (
    <Box p={"2rem 0"}>
      <hr
        style={{ backgroundColor: "#E50914", height: "1px", border: "none" }}
      />
      <Stack
        mt={"1.5rem"}
        mb={"2rem"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Trending Movies
        </Typography>
        <Typography
          sx={{
            fontSize: "1.2rem",
            color: "gray",
            backgroundColor: "none",
            "&:hover": { fontWeight: "bold" },
            cursor: "pointer",
            transition: "500ms ease",
          }}
          display={"flex"}
          direction={"row"}
          alignItems={"center"}
          gap="8px"
        >
          View All <ArrowForwardIcon fontSize="medium" />
        </Typography>
      </Stack>
      {/* cards here */}
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        {movieList.map((movie) => (
          <Box
            width={"21rem"}
            height={"fit-content"}
            sx={{ borderRadius: "12px" }}
          >
            <Box
              width={"100%"}
              height={"12rem"}
              sx={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/original${movie.backdrop_path})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              <Box
                justifyContent={"flex-end"}
                width={"100%"}
                display={"flex"}
                paddingTop={"8px"}
                paddingRight={"12px"}
              >
                <Rating voteAverage={movie.vote_average} />
              </Box>
            </Box>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginBottom={"12px"}
              key={movie.id}
            >
              <Typography variant="h5" fontWeight={"bold"}>
                {movie.title.length > 19
                  ? `${movie.title.slice(0, 19)}...`
                  : movie.title}
              </Typography>
              <Typography>
                <Runtime runtime={movie.movieDetails.runtime} />
              </Typography>
            </Stack>
            <Stack direction={"row"} gap="12px">
              {movie.movieDetails.genres.map((genre) => (
                <Typography
                  sx={{
                    color: "#E50914",
                    border: "1px solid #E50914",
                    padding: "2px 12px",
                    borderRadius: "5px",
                    cursor: "default",
                  }}
                >
                  {genre.name}
                </Typography>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
export default TrendingMovies;
