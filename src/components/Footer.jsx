import { Box, Stack, Typography, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box p={"5rem 0"} sx={{ backgroundColor: "black" }} overflow={"hidden"}>
      <Box width={"80%"} m={"0 auto"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <img src={logo} alt="" style={{ width: "13rem" }} />
            <Typography mt={".5rem"} fontSize={".8rem"} width={"28rem"}>
              Discover movies and TV shows effortlessly with MovieMate,
              providing concise and up-to-date information through the TMDB API
              for an always on-point cinematic experience.
            </Typography>
          </Box>
          <Box>
            <Button variant="outlined">
              <GitHubIcon /> Github Repository
            </Button>
            <Stack
              className="nav-links"
              direction={"row"}
              gap={"40px"}
              fontWeight={"regular"}
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
        </Stack>
      </Box>
    </Box>
  );
};
export default Footer;
