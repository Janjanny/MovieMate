import { Box, Typography } from "@mui/material";
import Placeholder from "../assets/placeholder.jpg";

const CastCard = () => {
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
          backgroundImage: `url(${Placeholder})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box p={"10px"} display={"flex"}>
        <Typography fontSize={"10px"} mt={"12px"}>
          <strong>Cillian Murphy</strong> <br /> J. Robert Oppenheimer
        </Typography>
      </Box>
    </Box>
  );
};
export default CastCard;
