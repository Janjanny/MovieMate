import {
  Box,
  Stack,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();

    // navigate to the search results page
    navigate(`/search/${searchValue}`);
  };

  // console.log(isShown);

  const handleClick = () => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down, and update the state
      setIsScrolled(window.scrollY > 0);
    };
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Stack
      width={"100%"}
      height={isShown ? "100%" : "fit-content"}
      margin={"auto"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={{ xs: "flex-start", lg: "center" }}
      p={"20px 10%"}
      position={"fixed"}
      zIndex={100}
      top={0}
      sx={{
        background:
          isScrolled || isShown ? "rgba(0, 0, 0, 0.7)" : "transparent",
        backdropFilter: isScrolled || isShown ? "blur(10px)" : "transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h4"
          color={"primary"}
          fontWeight={"900"}
          fontSize={{ xs: "25px", lg: "30px" }}
        >
          MovieMate
        </Typography>
      </Link>
      <Stack
        fontFamily={"Poppins"}
        className="nav-links"
        position={isShown ? "absolute" : "relative"}
        direction={isShown ? "column" : "row"}
        gap={"40px"}
        fontWeight={"regular"}
        textAlign={"center"}
        sx={{
          display: { xs: isShown ? "flex" : "none", lg: "flex" },
          top: { xs: "180px", lg: "0" },
          left: { xs: "50%", lg: "0" },
          transform: { xs: "translateX(-50%)", lg: "translateY(0)" },
          fontSize: { xs: "24px", lg: "16px" },
        }}
      >
        <Link
          className={`nav-items ${
            location.pathname === "/" ? "bold-link" : " "
          }`}
          to="/"
          onClick={() => {
            setIsShown(false);
          }}
        >
          Home
        </Link>
        <Link
          className={`nav-items ${
            location.pathname === "/movies" ? "bold-link" : " "
          }`}
          to="/movies"
          onClick={() => {
            setIsShown(false);
          }}
        >
          Movies
        </Link>
        <Link
          className={`nav-items ${
            location.pathname === "/tv-shows" ? "bold-link" : " "
          }`}
          to="/tv-shows"
          onClick={() => {
            setIsShown(false);
          }}
        >
          TV Shows
        </Link>
      </Stack>

      <Box
        className="search-bar"
        position={isShown ? "absolute" : "relative"}
        width={isShown ? "80%" : "fit-content"}
        sx={{
          top: { xs: "90px", lg: "0" },
          left: { xs: "50%", lg: "0" },
          transform: { xs: "translateX(-50%)", lg: "translateY(0)" },
        }}
      >
        <form onSubmit={handleSearch}>
          <OutlinedInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
            className="search-input"
            type="text"
            sx={{
              display: { xs: isShown ? "flex" : "none", lg: "flex" },
              color: "white",
              backgroundColor: "rgba(217, 217, 217, 0.25)",
              borderRadius: "2rem",
            }}
            id="input-with-icon-adornment"
            placeholder="Find Movies, Series..."
            startAdornment={
              <InputAdornment position="start" sx={{ color: "white" }}>
                <button className="submit-btn" type="submit">
                  <SearchIcon />
                </button>
              </InputAdornment>
            }
          />
        </form>
      </Box>
      <Box
        sx={{ display: { sm: "block", lg: "none" }, cursor: "pointer" }}
        onClick={() => {
          handleClick();
        }}
      >
        <MenuIcon fontSize="large" />
      </Box>
    </Stack>
  );
};
export default Navbar;
