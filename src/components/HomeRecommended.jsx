import { Box, Typography, Stack, Button } from "@mui/material";
import Rating from "./Rating";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MovieCard from "./MovieCard";

const HomeRecommended = () => {
  return (
    <Box p={"2rem 0"}>
      <hr
        style={{ backgroundColor: "#E50914", height: "1px", border: "none" }}
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        mt={"1.5rem"}
        mb={"2rem"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={"2rem"}>
          <Typography variant="h4" fontWeight={"bold"}>
            Recommended
          </Typography>
          <Stack direction={"row"} gap={"1rem"}>
            <Button
              variant="outlined"
              sx={{
                padding: "1px 12px",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
            >
              Movies
            </Button>
            <Button
              variant="outlined"
              sx={{
                padding: "1px 12px",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
            >
              TV Shows
            </Button>
          </Stack>
        </Stack>
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

      {/* movie cards */}
      <Stack direction={"row"} gap={"10px"}>
        <MovieCard />
      </Stack>
    </Box>
  );
};
export default HomeRecommended;
