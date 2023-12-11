import { Box, Typography, Stack } from "@mui/material";
import Rating from "./Rating";
import Runtime from "./Runtime";
import DateFormat from "./DateFormat";
import { Link } from "react-router-dom";
const MovieCard = ({
  title,
  genres,
  release_date,
  runtime,
  backdrop,
  rating,
  id,
}) => {
  return (
    <Box
      width={{ xs: "100%", md: "15.5rem" }}
      // height={{ xs: "14rem", sm: "25rem" }}
    >
      <Link to={`/details/${id}`} style={{ textDecoration: "none" }}>
        <Box
          width={"100%"}
          height={{ xs: "15rem", sm: "20rem" }}
          mb={"1rem"}
          sx={{
            backgroundImage: `url(https://www.themoviedb.org/t/p/original${backdrop})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box
            justifyContent={"flex-end"}
            width={"100%"}
            display={"flex"}
            paddingTop={"8px"}
            paddingRight={"12px"}
            sx={{ color: "white" }}
          >
            <Rating voteAverage={rating} />
          </Box>
        </Box>
      </Link>
      <Link
        to={`/details/${id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          fontSize={{ xs: "15px", sm: "21px" }}
          sx={{
            transition: "all 500ms ease",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {title.length > 15 ? `${title.slice(0, 15)}...` : title}
        </Typography>
      </Link>
      <Stack
        direction={"row"}
        mt={".8rem"}
        gap={{ xs: "5px", lg: "12px" }}
        flexWrap={"wrap"}
      >
        {genres.slice(0, 2).map((genre, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: { xs: "10px", sm: "16px" },
              color: "#E50914",
              border: "1px solid #E50914",
              padding: "2px 12px",
              borderRadius: "5px",
              cursor: "default",
            }}
          >
            {genre.name}
          </Typography>
        ))}
      </Stack>
      <Stack
        direction={"row"}
        mt={".8rem"}
        gap={{ xs: "8px", sm: "12px" }}
        fontSize={{ xs: "11px", sm: "15px" }}
      >
        <Typography fontSize={{ xs: "11px", sm: "15px" }}>
          <DateFormat movieDate={release_date} />
        </Typography>
        <p>&#x2022;</p>
        <Typography fontSize={{ xs: "11px", sm: "15px" }}>
          <Runtime runtime={runtime} />
        </Typography>
      </Stack>
    </Box>
  );
};
export default MovieCard;
