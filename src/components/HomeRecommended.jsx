import { Box, Typography, Stack, Button } from "@mui/material";
import Rating from "./Rating";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MovieCard from "./MovieCard";
import { useState } from "react";
import { Category } from "@mui/icons-material";

const HomeRecommended = ({ movieList, tvShowList }) => {
  const [currentList, setCurrentList] = useState("Movies");
  console.log(currentList);

  const handleClick = (category) => {
    setCurrentList(category);
  };

  console.log("movieDetails: ", movieList);
  return (
    <Box p={"2rem 0"}>
      <hr
        style={{ backgroundColor: "#E50914", height: "1px", border: "none" }}
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        mt={"1.5rem"}
        mb={"2rem"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={"2rem"}>
          <Typography variant="h4" fontWeight={"bold"}>
            Recommended
          </Typography>
          <Stack direction={"row"} gap={"1rem"}>
            <Button
              onClick={() => {
                handleClick("Movies");
              }}
              variant={currentList == "Movies" ? "contained" : "outlined"}
              sx={{
                padding: "1px 12px",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
            >
              Movies
            </Button>
            <Button
              onClick={() => {
                handleClick("TV Shows");
              }}
              variant={currentList == "TV Shows" ? "contained" : "outlined"}
              sx={{
                padding: "1px 12px",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
            >
              TV Shows
            </Button>
          </Stack>
        </Stack>
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

      {/* movie cards */}
      <Stack direction={"row"} justifyContent={"space-between"}>
        {movieList.slice(0, 4).map((movie) => (
          <MovieCard
            title={movie.title}
            genres={movie.movieDetails.genres}
            release_date={movie.release_date}
            runtime={movie.movieDetails.runtime}
            backdrop={movie.poster_path}
          />
        ))}
      </Stack>
    </Box>
  );
};
export default HomeRecommended;
