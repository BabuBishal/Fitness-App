import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const Exercises = ({ exercises, setExercises }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const exercisePerPage = 9;
  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;

  useEffect(() => {
    const fetchExerciseData = async () => {
      setLoading(true);
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=0",
        exerciseOptions
      );

      exerciseData && setExercises(exerciseData);
      setLoading(false);
    };
    fetchExerciseData();
  }, [setExercises]);

  const currentExercise = Array.isArray(exercises)
    ? exercises?.slice(indexOfFirstExercise, indexOfLastExercise)
    : [];

  // const exerciseData = fetchData(`${baseUrl}/exercises`, exerciseOptions);
  // console.log("exercise", exercises);
  // console.log(currentExercise);
  const paginate = (e, value) => {
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
        {!loading ? (
          currentExercise?.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))
        ) : (
          <Loader />
        )}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises?.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / 9)}
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
