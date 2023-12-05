import { Box, Typography, Stack } from "@mui/material";
import cover from "../assets/cover.jpg";
import Rating from "./Rating";
import Runtime from "./Runtime";
import DateFormat from "./DateFormat";
const MovieCard = ({ title, genres, release_date, runtime, backdrop }) => {
  // const genres = [
  //   { id: 11231, name: "Drama" },
  //   { id: 123, name: "History" },
  // ];
  return (
    <Box width={"14rem"} height={"25rem"}>
      <Box
        width={"100%"}
        height={"20rem"}
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
      <Stack direction={"row"} mt={".8rem"} gap={"12px"}>
        {genres.map((genre, index) => (
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
      <Stack direction={"row"} mt={".8rem"} gap={"24px"}>
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
