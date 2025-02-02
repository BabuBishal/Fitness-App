import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);

  const [bodyPart, setBodyPart] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseData = async () => {
      setLoading(true);
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=0",
        exerciseOptions
      );

      exerciseData && setExercises(exerciseData);
      exerciseData && setFilteredExercises(exerciseData);

      setLoading(false);
    };
    fetchExerciseData();
  }, []);

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setFilteredExercises={setFilteredExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        filteredExercises={filteredExercises}
        bodyPart={bodyPart}
        setFilteredExercises={setFilteredExercises}
        loading={loading}
      />
    </Box>
  );
};

export default Home;
