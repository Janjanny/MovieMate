import { Box, Typography, Grid, Button, Stack } from "@mui/material";
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
const Details = () => {
  const { id } = useParams();

  return (
    <>
      <Box pb={"5rem"} mb={"5rem"}>
        <Box
          className="hero-banner"
          width={"100%"}
          height={"80vh"}
          overflow={"hidden"}
          position={"absolute"}
          zIndex={0}
          sx={{
            backgroundImage: `url('${Background}')`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            "&::before": detailsOverlay,
            transition: "400ms ease-in",
          }}
        ></Box>
        <Box pt={"20rem"} width={"80%"} m={"0 auto"}>
          <Grid
            container
            width={"100%"}
            justifyContent={"center"}
            columnSpacing={4}
            rowSpacing={3}
          >
            {/* poster grid */}
            <Grid item lg={3} zIndex={5}>
              <Box
                className="poster"
                width={"100%"}
                height={"100%"}
                overflow={"hidden"}
                sx={{
                  backgroundImage: `url('${Poster}')`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></Box>
            </Grid>
            {/* title and overview grid */}
            <Grid item lg={9} zIndex={5}>
              <Stack direction={"column"} gap={"10px"} height={"100%"}>
                <Box width={"100%"}>
                  {" "}
                  <Stack direction={"row"}>
                    <Box width={"80%"}>
                      <Typography
                        sx={{
                          textTransform: "uppercase",
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        oppenheimer
                      </Typography>
                      <Stack
                        direction={"row"}
                        gap={{ xs: "8px", lg: "12px" }}
                        width={"100%"}
                        justifyContent={{ xs: "center", md: "flex-start" }}
                        sx={{
                          position: "relative",
                          zIndex: 5,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { xs: "12px", md: "14.5px" } }}
                        >
                          Drama, History
                        </Typography>

                        <p>&#x2022;</p>

                        <Typography
                          sx={{ fontSize: { xs: "12px", md: "14.5px" } }}
                        >
                          {" "}
                          07/19/2023 (PH)
                        </Typography>

                        <p>&#x2022;</p>

                        <Typography
                          sx={{ fontSize: { xs: "12px", md: "14.5px" } }}
                        >
                          {" "}
                          3h 1m
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "12px", md: "16px" },
                          marginTop: ".5rem",
                        }}
                      >
                        <span style={{ fontSize: "1.7rem" }}>82%</span> User
                        score
                      </Typography>
                    </Box>
                    <Box width={"20%"} sx={{ paddingTop: "1rem" }}>
                      <Button
                        className="watch-trailer-btn"
                        sx={{
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
                    The story of J. Robert Oppenheimer's role in the development
                    of the atomic bomb during World War II.
                  </Typography>
                  <Typography mt={"3rem"} fontSize={"14px"}>
                    <strong>Christopher Nolan</strong> <br /> Director, Writer
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            {/* movie status grid */}
            <Grid item lg={3} zIndex={5}>
              <Box
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                {/* status */}
                <Box
                  className="poster"
                  width={"100%"}
                  sx={{
                    border: "1px solid #909090",
                    borderRadius: "10px",
                    backgroundColor: "#0E0E0E",
                    padding: "1.7rem 1.7rem 5rem 1.7rem",
                  }}
                >
                  <Stack direction={"column"} gap={"24px"}>
                    <Typography fontSize={".9rem"}>
                      <strong>Status</strong> <br /> Released
                    </Typography>
                    <Typography fontSize={".9rem"}>
                      <strong>Original Language</strong> <br /> English
                    </Typography>
                    <Typography fontSize={".9rem"}>
                      <strong>Budget</strong> <br /> $100,000,000
                    </Typography>
                    <Typography fontSize={".9rem"}>
                      <strong>Revenue</strong> <br /> $900,000,000
                    </Typography>
                  </Stack>
                </Box>

                {/* socials */}
                <Box
                  className="poster"
                  width={"100%"}
                  mt={"1rem"}
                  sx={{
                    border: "1px solid #909090",
                    borderRadius: "10px",
                    backgroundColor: "#0E0E0E",
                    padding: "1.7rem 1.5rem ",
                  }}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Stack direction={"row"} gap={"20px"} color={"white"}>
                    <Link className="social-link">
                      <FacebookRoundedIcon fontSize={"large"} />
                    </Link>
                    <Link className="social-link">
                      <TwitterIcon fontSize={"large"} />
                    </Link>
                    <Link className="social-link">
                      <InstagramIcon fontSize={"large"} />
                    </Link>
                    <Link className="social-link">
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
                  {[...Array(10)].map((_, i) => (
                    <Grid item key={i} lg={2}>
                      {" "}
                      <CastCard />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* recommendations movie */}
        </Box>
      </Box>
    </>
  );
};
export default Details;
