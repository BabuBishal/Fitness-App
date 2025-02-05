import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";

// import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const Exercises = ({
  exercises,
  setFilteredExercises,
  filteredExercises,
  bodyPart,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  useEffect(() => {
    if (exercises.length) {
      setFilteredExercises(
        bodyPart === "all"
          ? exercises
          : exercises.filter((item) => item.bodyPart === bodyPart)
      );
      setCurrentPage(1);
    }
  }, [bodyPart, exercises, setFilteredExercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercise = filteredExercises?.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (_, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box
      id="exercises"
      sx={{
        mt: { lg: "110px" },
      }}
      mt="50px"
      p="20px"
    >
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: { lg: "110px", xs: "50px" },
        }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {loading ? (
          <Loader />
        ) : currentExercise.length > 0 ? (
          currentExercise.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No exercises match your search. Try a different keyword.
          </Typography>
        )}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {filteredExercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(filteredExercises.length / 9)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
