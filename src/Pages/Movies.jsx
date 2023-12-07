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

const Movies = () => {
  const backdropPath = "https://www.themoviedb.org/t/p/original";
  const categories = ["popular", "now_playing", "top_rated", "upcoming"];
  const [featured, setFeatured] = useState();
  const [category, setCategory] = useState("popular");
  const [movieList, setMovieList] = useState();

  // category handle click
  const handleClick = (category) => {
    setCategory(category);
  };

  // fetch movie
  useEffect(() => {
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
      };

      fetchMovies();
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  }, [category]);
  console.log("Movies movie list: ", movieList);
  return (
    <Box height={"fit-content"} pb={"5rem"}>
      <Box
        className="hero-banner"
        width={"100%"}
        height={"80vh"}
        overflow={"hidden"}
        position={"relative"}
        sx={{
          backgroundImage: `url('${Popular}')`,
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
          p={{ xs: "0 5%", md: "0 10%" }}
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
              THE CREATOR
            </Typography>
            <Typography
              width={"65%"}
              fontSize={{ xs: ".7rem", md: ".8rem" }}
              display={{ xs: "none", md: "block" }}
            >
              Amid a future war between the human race and the forces of
              artificial intelligence, a hardened ex-special forces agent
              grieving the disappearance of his wife, is recruited to hunt down
              and kill the Creator, the elusive architect of advanced AI who has
              developed a mysterious weapon with the power to end the war—and
              mankind itself.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="movie-section" width={"80%"} margin={"10rem auto"}>
        <Typography
          variant="h4"
          color={"primary"}
          fontSize={"3rem"}
          fontWeight={"900"}
          mb={"1rem"}
        >
          MOVIES
        </Typography>
        <hr
          style={{ backgroundColor: "#E50914", height: "1px", border: "none" }}
        />
        <Stack direction={"row"} gap={"32px"} mt={"2rem"} alignItems={"center"}>
          {categories.map((categoryName, index) => (
            <Typography
              key={index}
              fontWeight={category == categoryName ? "bold" : "regular"}
              onClick={() => {
                handleClick(categoryName);
              }}
              sx={{
                cursor: "pointer",
                fontSize: "1.2rem",
                transition: "all 0.3s ease",
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
        <Box mt={"5rem"}>
          <Grid
            container
            direction={"row"}
            columnSpacing={1}
            rowSpacing={{ xs: 4, sm: 5 }}
            justifyContent={"center"}
            width={"100%"}
          >
            {movieList?.map((movie) => (
              <Grid item lg={3} width={"100%"}>
                <MovieCard
                  title={movie.title}
                  genres={movie.movieDetails.genres}
                  release_date={movie.release_date}
                  runtime={movie.movieDetails.runtime}
                  backdrop={movie.poster_path}
                  rating={movie.movieDetails.vote_average}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default Movies;
