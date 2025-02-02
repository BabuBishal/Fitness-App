import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { exerciseOptions, youtubeOptions, fetchData } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import Loader from "../components/Loader";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState({});
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchExerciseData = async () => {
      try {
        const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
        const youtubeSearchUrl =
          "https://youtube-search-and-download.p.rapidapi.com";

        const exerciseDetailData = await fetchData(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions
        );
        setExerciseDetail(exerciseDetailData);
        // Fetch all data concurrently using Promise.all
        const [
          exerciseVideoData,
          targetMuscleExerciseData,
          equipmentExerciseData,
        ] = await Promise.all([
          fetchData(
            `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}workout`,
            youtubeOptions
          ),
          fetchData(
            `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
            exerciseOptions
          ),
          fetchData(
            `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
            exerciseOptions
          ),
        ]);

        setExerciseVideos(exerciseVideoData.contents);
        setTargetMuscleExercises(targetMuscleExerciseData);
        setEquipmentExercises(equipmentExerciseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
        setLoading(false);
      }
    };
    fetchExerciseData();
  }, [id]);
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Loader />
      </Box>
    );
  }
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
