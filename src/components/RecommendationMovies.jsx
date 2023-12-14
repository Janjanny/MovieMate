import { Box, Typography, Stack, Button, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

import Rating from "./Rating";

import Runtime from "./Runtime";

const RecommendationMovies = ({ movieDetails }) => {
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
          Recommended Movies
        </Typography>
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
                ></Box>
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
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default RecommendationMovies;
