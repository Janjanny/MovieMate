import { Box, Typography, Stack } from "@mui/material";
import Rating from "./Rating";
import Runtime from "./Runtime";
import DateFormat from "./DateFormat";
const MovieCard = ({ title, genres, release_date, runtime, backdrop }) => {
  return (
    <Box
      width={{ xs: "9rem", sm: "15.5rem" }}
      height={{ xs: "14rem", sm: "25rem" }}
    >
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
        >
          <Rating voteAverage={9.8} />
        </Box>
      </Box>
      <Typography variant="h5" fontWeight={"bold"}>
        {title.length > 15 ? `${title.slice(0, 15)}...` : title}
      </Typography>
      <Stack direction={"row"} mt={".8rem"} gap={"12px"} flexWrap={"wrap"}>
        {genres.slice(0, 2).map((genre, index) => (
          <Typography
            key={index}
            sx={{
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
      <Stack direction={"row"} mt={".8rem"} gap={"12px"}>
        <Typography>
          <DateFormat movieDate={release_date} />
        </Typography>
        <p>&#x2022;</p>
        <Typography>
          <Runtime runtime={runtime} />
        </Typography>
      </Stack>
    </Box>
  );
};
export default MovieCard;
