import { Box, Typography, Stack, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { afterOverlay } from "../utils/customStyles";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { popularCardShadow } from "../utils/customStyles";

import {
  fetchMovieData,
  movieOptions,
  fetchMovieDetails,
  showOptions,
} from "../utils/fetchAPI";

import DateFormat from "../components/DateFormat";
import Runtime from "../components/Runtime";
import TrendingMovies from "../components/TrendingMovies";
import TrendingTVShows from "../components/TrendingTVShows";
import HomeRecommended from "../components/HomeRecommended";

const Home = () => {
  // const [popularNow, setPopularNow] = useState([]);

  const backdropPath = "https://www.themoviedb.org/t/p/original";
  const [activeBackDrop, setActiveBackDrop] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [tvShowList, setTvShowList] = useState([]);

  // use effect for fetching tv shows
  useEffect(() => {
    try {
      // fetch trending movies
      const fetchShowAndDetails = async () => {
        const tvShow = await fetchMovieData(
          "https://api.themoviedb.org/3/trending/tv",
          "day",
          movieOptions
        );

        // console.log(tvShow.results[0].id);
        // fetch details for each shows
        const fetchDetails = tvShow.results.map(async (show) => {
          const details = await fetchMovieDetails(
            "https://api.themoviedb.org/3/tv",
            `${show.id}?language=en-US`,
            showOptions
          );

          return details;
        });

        // wait for all details fetch to complete
        const allDetails = await Promise.all(fetchDetails);
        // console.log(allDetails);

        // combine the movie datas with its details
        const showsWithDetails = tvShow.results.map((movie, index) => ({
          ...movie,
          movieDetails: allDetails[index],
        }));

        setTvShowList(showsWithDetails);
      };

      fetchShowAndDetails();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);
  // console.log("tvshows: ", tvShowList);
  // useEffect for fetching the movie data
  useEffect(() => {
    try {
      // fetch movie and details
      const fetchMovieAndDetails = async () => {
        const movies = await fetchMovieData(
          "https://api.themoviedb.org/3/trending/movie",
          "day",
          movieOptions
        );

        // fetch details for each movies
        const fetchDetails = movies.results.map(async (movie) => {
          const details = await fetchMovieDetails(
            "https://api.themoviedb.org/3/movie",
            `${movie.id}`,
            movieOptions
          );

          return details;
        });

        // wait for all details fetch to complete
        const allDetails = await Promise.all(fetchDetails);

        // combine the movie datas with its details
        const moviesWithGenres = movies.results.map((movie, index) => ({
          ...movie,
          movieDetails: allDetails[index],
        }));

        setMovieDetails(moviesWithGenres);
        setActiveBackDrop(moviesWithGenres[0].movieDetails);
      };
      fetchMovieAndDetails();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  console.log("activeBackdrop", activeBackDrop);
  // console.log("movieDetails: ", movieDetails);
  const topFours = movieDetails.slice(1, 5);
  // console.log(topFours);

  const handleBackdropClick = async (movieId) => {
    // fetch the movie using id
    try {
      const movieDetails = await fetchMovieDetails(
        "https://api.themoviedb.org/3/movie",
        `${movieId}`,
        movieOptions
      );
      setActiveBackDrop(movieDetails);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      {/* hero banner */}
      <Box
        width={"100%"}
        height={"fit-content"}
        position={"relative"}
        overflow={"hidden"}
        sx={{
          backgroundImage: `url('${backdropPath}${activeBackDrop.backdrop_path}')`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "&::before": afterOverlay,
          transition: "400ms ease-in",
        }}
      >
        <Box
          color={"white"}
          width={"100%"}
          height={"100%"}
          p={"2rem 13%"}
          marginTop={"12rem"}
          position={"relative"}
        >
          <Rating voteAverage={activeBackDrop.vote_average} />

          <Stack
            direction={"row"}
            gap={"20px"}
            sx={{ position: "relative", zIndex: 5 }}
          >
            <Typography>
              {activeBackDrop.genres
                ? activeBackDrop.genres.map((genre) => genre.name).join(", ")
                : " "}
            </Typography>

            <p>&#x2022;</p>

            <Typography>
              <DateFormat movieDate={activeBackDrop.release_date} />
            </Typography>

            <p>&#x2022;</p>

            <Typography>
              <Runtime runtime={activeBackDrop.runtime} />
            </Typography>
          </Stack>
          <Typography
            variant="h2"
            fontSize={"3.5rem"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
            margin={".6rem 0"}
            sx={{ position: "relative", zIndex: 5 }}
          >
            {activeBackDrop.title}
          </Typography>
          <Typography width={"45%"} sx={{ position: "relative", zIndex: 5 }}>
            {activeBackDrop.overview}
          </Typography>
          <Stack direction={"row"} gap={"1.3rem"} mt={"2rem"}>
            <Button
              variant="contained"
              sx={{
                gap: "8px",
                borderRadius: "20px",
                position: "relative",
                zIndex: 5,
              }}
            >
              <PlayArrowIcon /> Watch Trailer
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#656565",
                borderRadius: "20px",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                position: "relative",
                zIndex: 5,
              }}
            >
              See Details
            </Button>
          </Stack>

          {/* popular movies */}
          <Box mt={"7rem"}>
            <Typography
              mb={"1.5rem"}
              fontSize={"1rem"}
              fontWeight={"regular"}
              sx={{ position: "relative", zIndex: 5 }}
            >
              Popular Now
            </Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
              {topFours.map((popular) => (
                <Box
                  key={popular.id}
                  onClick={() => {
                    handleBackdropClick(popular.id);
                  }}
                  width={"230px"}
                  height={"120px"}
                  borderRadius={"12px"}
                  overflow={"hidden"}
                  sx={{
                    position: "relative",
                    zIndex: 5,
                    backgroundImage: `url(${backdropPath}${popular.backdrop_path})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    cursor: "pointer",
                    "&::after": popularCardShadow,
                    "&:hover": {
                      "&::after": {
                        opacity: 0, // Set opacity to 0 on hover
                      },
                    },
                  }}
                ></Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* trending movies */}
      <Box
        m={"12rem auto 5rem auto"}
        width={"80%"}
        sx={{ backgroundColor: "none" }}
      >
        <TrendingMovies movieDetails={movieDetails} />
      </Box>

      {/* trending shows */}
      <Box
        m={"5rem auto 5rem auto"}
        width={"80%"}
        sx={{ backgroundColor: "none" }}
      >
        <TrendingTVShows tvShows={tvShowList} />
      </Box>

      {/* Recomended Movies */}
      <Box
        m={"5rem auto 12rem auto"}
        width={"80%"}
        sx={{ backgroundColor: "none" }}
      >
        <HomeRecommended movieList={movieDetails} tvShowList={tvShowList} />
      </Box>
    </>
  );
};

export default Home;
