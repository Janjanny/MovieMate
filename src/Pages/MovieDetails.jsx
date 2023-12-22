import { Box, Typography, Grid, Button, Stack, Modal } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Background from "../assets/background.jpg";
import Poster from "../assets/cover.jpg";
import { afterOverlay, detailsOverlay } from "../utils/customStyles";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { Link } from "react-router-dom";
import CastCard from "../components/CastCard";

import { movieOptions, fetchMovieDetails } from "../utils/fetchAPI";
import DateFormat from "../components/DateFormat";
import Runtime from "../components/Runtime";
import Loader from "../components/Loader";
import RecommendationMovies from "../components/RecommendationMovies";

const MovieDetails = () => {
  const { id } = useParams();
  const backdropPath = "https://www.themoviedb.org/t/p/original";
  const [movieDetails, setMovieDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // function for modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // function for finding the director
  const findDirector = (data) => {
    const directorData = data.find((entry) => entry.job === "Director");
    return directorData.name;
  };

  // render the movie using its id
  useEffect(() => {
    // add event for scroll to top
    window.scrollTo(0, 0);
    try {
      const fetchMovieInfos = async () => {
        const movieDetailsData = await fetchMovieDetails(
          "https://api.themoviedb.org/3/movie/",
          id,
          movieOptions
        );

        const movieCreditsData = await fetchMovieDetails(
          "https://api.themoviedb.org/3/movie/",
          `${id}/credits`,
          movieOptions
        );

        const movieVideosData = await fetchMovieDetails(
          "https://api.themoviedb.org/3/movie/",
          `${id}/videos`,
          movieOptions
        );
        const moviesSocialsData = await fetchMovieDetails(
          "https://api.themoviedb.org/3/movie/",
          `${id}/external_ids`,
          movieOptions
        );

        const recommendedMovies = await fetchMovieDetails(
          "https://api.themoviedb.org/3/movie/",
          `${id}/recommendations`,
          movieOptions
        );

        const combineData = {
          details: movieDetailsData,
          credits: movieCreditsData,
          videos: movieVideosData,
          socials: moviesSocialsData,
          recommendations: recommendedMovies.results,
        };

        // set the combineData into movieDetails state
        setMovieDetails(combineData);
      };

      fetchMovieInfos();
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  }, [id]);

  // function for ratings
  const ratingPercent = (rating) => {
    return Math.trunc(rating * 10);
  };

  // function for trailer
  const trailerVideo = (data) => {
    const trailer = data.find((entry) => entry.type === "Trailer");
    return `https://www.youtube.com/embed/${trailer.key}`;
  };

  // console.log(trailerVideo(movieDetails.videos.results));
  console.log(movieDetails);

  return (
    <>
      {Object.keys(movieDetails).length > 0 ? (
        <Box pb={"5rem"} mb={"5rem"}>
          <Box
            className="hero-banner"
            width={"100%"}
            height={"80vh"}
            overflow={"hidden"}
            position={"absolute"}
            zIndex={0}
            sx={{
              backgroundImage: `url('${backdropPath}${movieDetails.details.backdrop_path}')`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              "&::before": detailsOverlay,
              transition: "400ms ease-in",
            }}
          ></Box>
          <Box
            pt={"20rem"}
            width={{ xs: "95%", md: "90%", lg: "80%" }}
            m={"0 auto"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Grid
              container
              width={"100%"}
              justifyContent={"center"}
              columnSpacing={4}
              rowSpacing={3}
            >
              {/* poster grid */}
              <Grid item xs={12} md={12} lg={3} zIndex={5}>
                <Box
                  className="poster"
                  width={"100%"}
                  height={"100%"}
                  display={{ xs: "none", lg: "block" }}
                  sx={{
                    backgroundImage: `url('${backdropPath}${movieDetails.details.poster_path}')`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></Box>
              </Grid>
              {/* title and overview grid */}
              <Grid item md={12} lg={9} zIndex={5} overflow={"hidden"}>
                <Stack direction={"column"} gap={"10px"} height={"100%"}>
                  <Box width={"100%"}>
                    {" "}
                    <Stack
                      direction={{ xs: "column-reverse", sm: "row" }}
                      justifyContent={"space-between"}
                    >
                      <Box width={{ lg: "80%" }}>
                        <Typography
                          sx={{
                            textTransform: "uppercase",
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            lineHeight: "3rem",
                            marginTop: { xs: "1rem", sm: "0" },
                          }}
                        >
                          {movieDetails.details.title}
                        </Typography>
                        <Stack
                          direction={"row"}
                          gap={{ xs: "8px", lg: "12px" }}
                          width={"100%"}
                          justifyContent={{
                            xs: "flex-start",
                            md: "flex-start",
                          }}
                          sx={{
                            position: "relative",
                            zIndex: 5,
                          }}
                          textAlign={"left"}
                        >
                          <Typography
                            sx={{ fontSize: { xs: "12px", md: "14.5px" } }}
                          >
                            {movieDetails.details.genres
                              .map((genre, index) => genre.name)
                              .join(", ")}
                          </Typography>

                          <p>&#x2022;</p>

                          <Typography
                            sx={{ fontSize: { xs: "12px", md: "14.5px" } }}
                          >
                            {" "}
                            <DateFormat
                              movieDate={movieDetails.details.release_date}
                            />
                          </Typography>

                          <p>&#x2022;</p>

                          <Typography
                            sx={{ fontSize: { xs: "12px", md: "14.5px" } }}
                          >
                            {" "}
                            <Runtime runtime={movieDetails.details.runtime} />
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "12px", md: "16px" },
                            marginTop: ".5rem",
                          }}
                        >
                          <span style={{ fontSize: "1.7rem" }}>
                            {ratingPercent(movieDetails.details.vote_average)}%
                          </span>{" "}
                          User score
                        </Typography>
                      </Box>
                      <Box
                        width={{ xs: "100%", sm: "30%" }}
                        sx={{ paddingTop: "1rem" }}
                        display={"flex"}
                        justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      >
                        {/* <Link
                          to={trailerVideo(movieDetails.videos.results)}
                          target="blank"
                        >
                          <Button
                            className="watch-trailer-btn"
                            sx={{
                              alignSelf: "flex-start",
                              color: "white",
                              border: "1px solid white",
                              gap: "10px",
                              fontWeight: "bold",
                              ":hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(5px)",
                              },
                            }}
                          >
                            <MovieCreationOutlinedIcon /> Watch trailer
                          </Button>
                        </Link> */}

                        <Button
                          className="watch-trailer-btn"
                          onClick={handleOpenModal}
                          sx={{
                            alignSelf: "flex-start",
                            color: "white",
                            border: "1px solid white",
                            gap: "10px",
                            fontWeight: "bold",
                            ":hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              backdropFilter: "blur(5px)",
                            },
                          }}
                        >
                          <MovieCreationOutlinedIcon /> Watch trailer
                        </Button>
                        {isModalOpen && (
                          <Modal
                            open={isModalOpen}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                maxWidth: 720,
                                width: "100%",
                                backgroundColor: "transparent",
                                border: "2px solid #000",
                                boxShadow: 24,
                              }}
                            >
                              <iframe
                                width="100%"
                                height="405"
                                src={trailerVideo(movieDetails.videos.results)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              ></iframe>
                            </Box>
                          </Modal>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                  {/* overview */}
                  <Box
                    width={"100%"}
                    sx={{
                      border: "1px solid #909090",
                      borderRadius: "10px",
                      backgroundColor: "#0E0E0E",
                      padding: "1.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "medium",
                        fontSize: "1.2rem",
                        marginBottom: "8px",
                      }}
                    >
                      Overview
                    </Typography>
                    <Typography fontSize={"14px"}>
                      {movieDetails.details.overview}
                    </Typography>
                    <Typography mt={"3rem"} fontSize={"14px"}>
                      <strong>{findDirector(movieDetails.credits.crew)}</strong>
                      <br /> Director
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* movie status grid */}
              <Grid item xs={12} sm={12} lg={3} zIndex={5}>
                <Box
                  height={"100%"}
                  display={"flex"}
                  width={"100%"}
                  flexDirection={{ xs: "row", sm: "column" }}
                  justifyContent={"space-between"}
                >
                  {/* status */}
                  <Box
                    className="poster"
                    width={{ xs: "75%", sm: "100%" }}
                    sx={{
                      border: "1px solid #909090",
                      borderRadius: "10px",
                      backgroundColor: "#0E0E0E",
                      padding: {
                        xs: "1.7rem 1.7rem 5rem 1.7rem",
                        sm: "1.5rem",
                        lg: "1.7rem 1.7rem 5rem 1.7rem",
                      },
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row", lg: "column" }}
                      gap={"24px"}
                      sx={{
                        justifyContent: {
                          xs: "flex-start",
                          sm: "space-between",
                          lg: "flex-start",
                        },
                      }}
                    >
                      <Typography
                        fontSize={".9rem"}
                        textAlign={{ xs: "left", sm: "center", lg: "left" }}
                      >
                        <strong>Status</strong> <br />{" "}
                        {movieDetails.details.status}
                      </Typography>
                      <Typography
                        fontSize={".9rem"}
                        textAlign={{ xs: "left", sm: "center", lg: "left" }}
                      >
                        <strong>Original Language</strong> <br />{" "}
                        {movieDetails.details.spoken_languages.map(
                          (language) => (
                            <p>{language.name}</p>
                          )
                        )}
                      </Typography>
                      <Typography
                        fontSize={".9rem"}
                        textAlign={{ xs: "left", sm: "center", lg: "left" }}
                      >
                        <strong>Budget</strong> <br />{" "}
                        {movieDetails.details.budget.toLocaleString("en-us", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Typography>
                      <Typography
                        fontSize={".9rem"}
                        textAlign={{ xs: "left", sm: "center", lg: "left" }}
                      >
                        <strong>Revenue</strong> <br />{" "}
                        {movieDetails.details.revenue.toLocaleString("en-us", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* socials */}
                  <Box
                    className="poster"
                    width={{ xs: "20%", sm: "100%" }}
                    mt={{ xs: "0", sm: "1rem" }}
                    sx={{
                      border: "1px solid #909090",
                      borderRadius: "10px",
                      backgroundColor: "#0E0E0E",
                      padding: "1.7rem 1.5rem ",
                    }}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      width={"100%"}
                      gap={"20px"}
                      color={"white"}
                      justifyContent={"space-around"}
                      alignItems={"center"}
                    >
                      <Link
                        className="social-link"
                        to={`https://www.facebook.com/${movieDetails.socials.facebook_id}`}
                        target="_blank"
                      >
                        <FacebookRoundedIcon fontSize={"large"} />
                      </Link>
                      <Link
                        className="social-link"
                        to={`https://www.twitter.com/${movieDetails.socials.twitter_id}`}
                        target="_blank"
                      >
                        <TwitterIcon fontSize={"large"} />
                      </Link>
                      <Link
                        className="social-link"
                        to={`https://www.instagram.com/${movieDetails.socials.instagram_id}`}
                        target="_blank"
                      >
                        <InstagramIcon fontSize={"large"} />
                      </Link>
                      <Link
                        className="social-link"
                        to={`${movieDetails.details.homepage}`}
                        target="_blank"
                      >
                        <LaunchOutlinedIcon fontSize={"large"} />
                      </Link>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              {/* movie cast grid */}
              <Grid item lg={9} zIndex={5}>
                <Box
                  width={"100%"}
                  height={"100%"}
                  sx={{
                    border: "1px solid #909090",
                    borderRadius: "10px",
                    backgroundColor: "#0E0E0E",
                    padding: "1.5rem",
                  }}
                >
                  <Typography
                    fontSize={"1.2rem"}
                    fontWeight={"medium"}
                    mb={"2rem"}
                  >
                    Top Billed Cast
                  </Typography>
                  <Grid
                    container
                    width={"100%"}
                    justifyContent={"center"}
                    gap={1}
                  >
                    {movieDetails.credits.cast
                      .map((cast, i) => (
                        <Grid item key={i} xs={4} sm={3} md={2} lg={2}>
                          {" "}
                          <CastCard
                            movieName={cast.character}
                            actualName={cast.name}
                            photoPath={cast.profile_path}
                          />
                        </Grid>
                      ))
                      .slice(0, 10)}
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            {/* recommendations movie */}
            {movieDetails.recommendations.length > 0 ? (
              <Box
                m={"5rem auto 5rem auto"}
                width={{ xs: "100%", lg: "100%" }}
                sx={{ backgroundColor: "none" }}
                overflow={"hidden"}
              >
                <RecommendationMovies
                  movieDetails={movieDetails.recommendations}
                />
              </Box>
            ) : (
              " "
            )}
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
export default MovieDetails;
