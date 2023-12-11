import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";

const Rating = ({ voteAverage }) => {
  // console.log(voteAverage);
  return (
    <Box
      sx={{ position: "relative", zIndex: 5, textDecoration: "none" }}
      className="rating"
      fontSize={"14px"}
    >
      <StarIcon fontSize="14px" />{" "}
      {voteAverage ? voteAverage.toFixed(1) : " N/A"}
    </Box>
  );
};
export default Rating;
