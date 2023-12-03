import {
  Box,
  Stack,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <Stack
      width={"100%"}
      margin={"auto"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={"30px 10%"}
      // sx={{ borderBottom: "1px solid #989898" }}
      position={"fixed"}
      zIndex={100}
      top={0}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography variant="h4" color={"primary"} fontWeight={"900"}>
          MovieMate
        </Typography>
      </Link>
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
        <Link to="/movies" style={{ color: "white", textDecoration: "none" }}>
          Movies
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          TV Shows
        </Link>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          People
        </Link>
      </Stack>
      <Box className="search-bar">
        <OutlinedInput
          sx={{
            color: "white",
            backgroundColor: "rgba(217, 217, 217, 0.25)",
            borderRadius: "2rem",
          }}
          id="input-with-icon-adornment"
          placeholder="Find Movies, Series..."
          startAdornment={
            <InputAdornment position="start" sx={{ color: "white" }}>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
    </Stack>
  );
};
export default Navbar;
