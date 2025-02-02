import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const baseUrl = process.env.RAPID_API_BASE_URL;

const Exercises = ({ exercises, setExercises }) => {
  // console.log(exercises);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisePerPage = 9;
  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
  console.log("first: ", indexOfFirstExercise);
  console.log("last: ", indexOfLastExercise);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=27&offset=0",
        exerciseOptions
      );

      setExercises(exerciseData);
    };
    fetchExerciseData();
  }, []);

  const currentExercise = Array.isArray(exercises)
    ? exercises?.slice(indexOfFirstExercise, indexOfLastExercise)
    : [];
  console.log(currentExercise);

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
        {currentExercise?.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
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
