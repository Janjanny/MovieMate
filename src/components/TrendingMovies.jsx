import { Box, Typography, Stack, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Popular1 from "../assets/popular-1.jpg";
import { useState, useEffect } from "react";

import {
  fetchMovieData,
  movieOptions,
  fetchMovieDetails,
} from "../utils/fetchAPI";

const TrendingMovies = () => {
  const genreList = ["Drama", "History"];

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    try {
      const fetchMovie = async () => {
        const movies = await fetchMovieData(
          "https://api.themoviedb.org/3/trending/movie",
          "day",
          movieOptions
        );
        setMovieList(movies.results.slice(5, 8));
      };

      fetchMovie();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  console.log(movieList);
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
      <Stack direction={"row"}>
        <Box
          width={"20rem"}
          height={"fit-content"}
          sx={{ borderRadius: "12px" }}
        >
          <Box
            width={"100%"}
            height={"12rem"}
            sx={{
              backgroundImage: `url(${Popular1})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "12px",
              marginBottom: "12px",
            }}
          ></Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={"12px"}
          >
            <Typography variant="h5" fontWeight={"bold"}>
              Oppenheimer
            </Typography>
            <Typography>3h 1m</Typography>
          </Stack>
          <Stack direction={"row"} gap="12px">
            {genreList.map((genre) => (
              <Typography
                sx={{
                  color: "#E50914",
                  border: "1px solid #E50914",
                  padding: "2px 12px",
                  borderRadius: "5px",
                  cursor: "default",
                }}
              >
                {genre}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default TrendingMovies;
