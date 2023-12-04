import { Box, Typography, Stack, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Rating from "./Rating";

const TrendingTVShows = ({ tvShows }) => {
  const tvShowList = tvShows.slice(5, 8);
  // console.log("tvshows", tvShows);
  // console.log("tvShowList : ", tvShowList);
  return (
    <Box p={"2rem 0"}>
      <hr
        style={{ backgroundColor: "#E50914", height: "1px", border: "none" }}
      />
      <Stack
        mt={"1.5rem"}
        mb={"2rem"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Trending TV Shows
        </Typography>
        <Typography
          sx={{
            fontSize: "1.2rem",
            color: "gray",
            backgroundColor: "none",
            "&:hover": { fontWeight: "bold" },
            cursor: "pointer",
            transition: "500ms ease",
          }}
          display={"flex"}
          direction={"row"}
          alignItems={"center"}
          gap="8px"
        >
          View All <ArrowForwardIcon fontSize="medium" />
        </Typography>
      </Stack>
      {/* cards here */}
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        {tvShowList.map((movie) => (
          <Box
            key={movie.id}
            width={"21rem"}
            height={"fit-content"}
            sx={{ borderRadius: "12px" }}
          >
            <Box
              width={"100%"}
              height={"12rem"}
              sx={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/original${movie.backdrop_path})`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              <Box
                justifyContent={"flex-end"}
                width={"100%"}
                display={"flex"}
                paddingTop={"8px"}
                paddingRight={"12px"}
              >
                <Rating voteAverage={movie.vote_average} />
              </Box>
            </Box>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginBottom={"12px"}
              key={movie.id}
            >
              <Typography variant="h5" fontWeight={"bold"}>
                {movie.name.length > 19
                  ? `${movie.name.slice(0, 19)}...`
                  : movie.name}
              </Typography>
              <Typography>
                {movie.movieDetails.number_of_seasons > 1
                  ? `${movie.movieDetails.number_of_seasons} Seasons`
                  : `${movie.movieDetails.number_of_seasons} Season`}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap="12px" flexWrap={"wrap"}>
              {movie.movieDetails.genres.map((genre, index) => (
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
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
export default TrendingTVShows;
