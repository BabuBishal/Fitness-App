import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box
      sx={{
        mt: { lg: "100px", xs: "10px" },
      }}
    >
      <Typography variant="h3" mb="5px">
        Exercises that target the same muscle group
      </Typography>
      <Stack
        direction="row"
        sx={{ p: "20px", position: "relative", mb: "10px" }}
      >
        {targetMuscleExercises.length ? (
          <HorizontalScrollbar data={targetMuscleExercises} />
        ) : (
          <Loader />
        )}
      </Stack>
      <Typography variant="h3" mb="10px">
        Exercises that uses the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: "20px", position: "relative" }}>
        {equipmentExercises.length ? (
          <HorizontalScrollbar data={equipmentExercises} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
