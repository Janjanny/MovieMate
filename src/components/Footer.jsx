import { Box, Stack, Typography, Button, Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box p={"5rem 0"} sx={{ backgroundColor: "black" }} overflow={"hidden"}>
      <Box width={{ xs: "95%", md: "90%", lg: "80%" }} m={"0 auto"}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          columnSpacing={2}
          rowSpacing={10}
        >
          <Grid item xs={12} md={6} lg={6}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box alignSelf={{ xs: "center", md: "flex-start" }}>
                {" "}
                <img src={logo} alt="" style={{ width: "13rem" }} />
              </Box>
              <Typography
                mt={".5rem"}
                fontSize={".8rem"}
                width={"28rem"}
                alignSelf={{ xs: "center", md: "flex-start" }}
                textAlign={{ xs: "center", md: "left" }}
              >
                Discover movies and TV shows effortlessly with MovieMate,
                providing concise and up-to-date information through the TMDB
                API for an always on-point cinematic experience.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              gap={"24px"}
              flexDirection={"column"}
              height={"100%"}
            >
              <Button
                variant="outlined"
                sx={{
                  alignSelf: { xs: "center", md: "flex-end" },
                  color: "white",
                  borderColor: "white",
                  gap: "15px",
                  padding: "8px 18px",
                }}
              >
                <GitHubIcon /> Github Repository
              </Button>
              <Stack
                className="nav-links"
                direction={"row"}
                gap={"40px"}
                fontWeight={"regular"}
                sx={{
                  alignSelf: { xs: "center", md: "flex-end" },
                  fontFamily: "Poppins",
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/movies"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Movies
                </Link>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  TV Shows
                </Link>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  People
                </Link>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Footer;
