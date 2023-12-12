import { Box, Typography } from "@mui/material";
import Placeholder from "../assets/placeholder.jpg";

const CastCard = ({ movieName, actualName, photoPath }) => {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      sx={{
        backgroundColor: "#1E1E1E",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          height: "6.5rem",
          backgroundImage: `url(https://www.themoviedb.org/t/p/w138_and_h175_face${photoPath})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box p={"10px"} display={"flex"}>
        <Typography fontSize={"10px"} mt={"12px"}>
          <strong>{actualName}</strong> <br /> {movieName}
        </Typography>
      </Box>
    </Box>
  );
};
export default CastCard;
