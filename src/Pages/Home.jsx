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
} from "../utils/fetchAPI";

import DateFormat from "../components/DateFormat";
import Runtime from "../components/Runtime";

const Home = () => {
  // const [popularNow, setPopularNow] = useState([]);

  const backdropPath = "https://www.themoviedb.org/t/p/original";
  const [populars, setPopulars] = useState([]);
  const [activeBackDrop, setActiveBackDrop] = useState("");
  const [movieDetails, setMovieDetails] = useState("");

  // useEffect for fetching the data
  useEffect(() => {
    const fetchMovieBanner = async () => {
      try {
        const movies = await fetchMovieData(
          "https://api.themoviedb.org/3/movie",
          "popular",
          movieOptions
        );
        setPopulars(movies.results);
        setActiveBackDrop(movies.results[0]);

        // fetch movie detail
        const movieDetails = await fetchMovieDetails(
          "https://api.themoviedb.org/3/movie",
          `${activeBackDrop.id}`,
          movieOptions
        );
        setMovieDetails(movieDetails);
      } catch (error) {
        console.log("Error while fetching: ", error);
      }
    };
    fetchMovieBanner();
  }, []);

  // fetch specific movieDetails
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (activeBackDrop.id) {
          const movieDetails = await fetchMovieDetails(
            "https://api.themoviedb.org/3/movie",
            `${activeBackDrop.id}`,
            movieOptions
          );
          setMovieDetails(movieDetails);
        }
      } catch (error) {
        console.log("Error while fetching: ", error);
      }
    };

    fetchMovieDetail();
  }, [activeBackDrop]);

  const topFours = populars.slice(1, 5);

  const handleBackdropClick = async (movieId) => {
    // fetch the movie using id
    try {
      const movieDetails = await fetchMovieDetails(
        "https://api.themoviedb.org/3/movie",
        `${movieId}`,
        movieOptions
      );
      setMovieDetails(movieDetails);
    } catch (error) {
      console.log("Error: ", error);
    }

    movieDetails();
  };

  // console.log(populars[0]);
  // console.log(movieDetails.id);

  return (
    <Box
      width={"100%"}
      height={"fit-content"}
      position={"relative"}
      overflow={"hidden"}
      sx={{
        backgroundImage: `url('${backdropPath}${movieDetails.backdrop_path}')`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        "&::before": afterOverlay,
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
        <Rating voteAverage={movieDetails.vote_average} />

        <Stack
          direction={"row"}
          gap={"20px"}
          sx={{ position: "relative", zIndex: 5 }}
        >
          <Typography>
            {movieDetails && movieDetails.genres
              ? movieDetails.genres.map((genre) => genre.name).join(", ")
              : " "}
          </Typography>

          <p>&#x2022;</p>

          <Typography>
            <DateFormat movieDate={movieDetails.release_date} />
          </Typography>

          <p>&#x2022;</p>

          <Typography>
            <Runtime runtime={movieDetails.runtime} />
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
          {movieDetails.title}
        </Typography>
        <Typography width={"45%"} sx={{ position: "relative", zIndex: 5 }}>
          {movieDetails.overview}
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
  );
};

export default Home;
