import { Box, Typography, Stack, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

import Rating from "./Rating";

import Runtime from "./Runtime";

const TrendingMovies = ({ movieDetails }) => {
  const movieList = movieDetails.slice(5, 8);
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
        <Typography
          variant="h4"
          fontSize={{ xs: "1.5rem", md: "2rem" }}
          fontWeight={"bold"}
        >
          Trending Movies
        </Typography>
        <Link to="/movies" style={{ textDecoration: "none" }}>
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
        </Link>
      </Stack>

      {/* cards here */}
      <Grid
        container
        width={"100%"}
        rowSpacing={4}
        columnSpacing={{ xs: 4, lg: 2 }}
        justifyContent={"center"}
      >
        {movieList.map((movie) => (
          <Grid item md={12} lg={4} width={"100%"}>
            <Box
              key={movie.id}
              height={"fit-content"}
              sx={{ borderRadius: "12px" }}
            >
              <Link
                to={`/movie-details/${movie.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Box
                  height={"12rem"}
                  sx={{
                    backgroundImage: `url(https://www.themoviedb.org/t/p/original${movie.backdrop_path})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    borderRadius: "12px",
                    marginBottom: "12px",
                    postion: "relative",
                    "&:hover": {
                      transition: "all .3s ease",
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
                      opacity: 0.6, // Set the low opacity for the image on hover
                    },
                  }}
                >
                  <Box
                    justifyContent={"flex-end"}
                    display={"flex"}
                    paddingTop={"8px"}
                    paddingRight={"12px"}
                  >
                    <Rating voteAverage={movie.vote_average} />
                  </Box>
                </Box>
              </Link>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={"12px"}
                key={movie.id}
              >
                <Link
                  to={`/details/${movie.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    fontSize={{ xs: "18px", sm: "21px" }}
                    sx={{
                      transition: "all 500ms ease",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {movie.title.length > 19
                      ? `${movie.title.slice(0, 19)}...`
                      : movie.title}
                  </Typography>
                </Link>
                <Typography fontSize={{ xs: "12px", sm: "15px" }}>
                  <Runtime runtime={movie.movieDetails.runtime} />
                </Typography>
              </Stack>
              <Stack direction={"row"} gap="12px">
                {movie.movieDetails.genres.slice(0, 2).map((genre, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: { xs: "11px", sm: "16px" },
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default TrendingMovies;
