import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Stack } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />

      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#ffa9a9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
            padding: "5px",
            "&:hover": {
              backgroundColor: "#ffaaaa",
            },
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#fcc757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
            padding: "5px",
            "&:hover": {
              backgroundColor: "#fcc700",
            },
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      <Typography
        fontWeight={600}
        fontSize="18px"
        color="#000"
        textTransform="capitalize"
        ml="20px"
        pt="10px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
