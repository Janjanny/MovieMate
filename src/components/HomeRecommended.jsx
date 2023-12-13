import { Box, Typography, Stack, Button, Grid } from "@mui/material";
import Rating from "./Rating";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MovieCard from "./MovieCard";
import { useState } from "react";
import { Category } from "@mui/icons-material";
import TvShowCard from "./TvShowCard";

const HomeRecommended = ({ movieList, tvShowList }) => {
  const [currentList, setCurrentList] = useState("Movies");
  // console.log(currentList);

  const handleClick = (category) => {
    setCurrentList(category);
  };

  // console.log("movieDetails: ", movieList);
  // console.log("tvShowList: ", tvShowList[0]);
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
        alignItems={"flex-start"}
      >
        <Stack direction={{ xs: "column", lg: "row" }} gap={"2rem"}>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            fontSize={{ xs: "1.5rem", md: "2rem" }}
          >
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
            fontSize: { xs: "1rem", md: '"1.2rem"' },
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
      <Grid
        container
        direction={"row"}
        columnSpacing={1}
        rowSpacing={{ xs: 4, sm: 8 }}
        justifyContent={"center"}
        width={"100%"}
      >
        {currentList == "Movies"
          ? movieList.slice(0, 4).map((movie) => (
              <Grid item xs={6} sm={6} md={4} lg={3}>
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
            ))
          : tvShowList.slice(0, 4).map((show) => (
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <TvShowCard
                  title={show.name}
                  genres={show.movieDetails.genres}
                  release_date={show.first_air_date}
                  backdrop={show.poster_path}
                  runtime={show.movieDetails.number_of_seasons}
                  id={show.id}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};
export default HomeRecommended;
