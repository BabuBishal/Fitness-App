import React, { useState, useEffect } from "react";

import { Box, Stack, TextField, Button, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setFilteredExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );

      setBodyParts(["all", ...bodyPartsData]);
      // setSearch(bodyPart);
    };
    fetchExerciseData();
  }, []);

  // const handleSearch = async () => {
  //   if (search) {
  //     const exerciseData = await fetchData(
  //       "https://exercisedb.p.rapidapi.com/exercises?limit=0",
  //       exerciseOptions
  //     );
  //     // console.log(exerciseData)
  //     const searchedExercises = exerciseData.filter(
  //       (item) =>
  //         item.name.toLowerCase().includes(search) ||
  //         item.target.toLowerCase().includes(search) ||
  //         item.equipment.toLowerCase().includes(search) ||
  //         item.bodyPart.toLowerCase().includes(search)
  //     );

  //     setSearch("");
  //     setFilteredExercises(searchedExercises);
  //     // console.log(searchedExercises);
  //   }
  // };

  const handleSearch = async () => {
    if (!search.trim()) return; // Prevent empty searches

    try {
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=0",
        exerciseOptions
      );

      if (!exerciseData || !Array.isArray(exerciseData)) {
        console.error("Invalid data format");
        return;
      }

      const searchedExercises = exerciseData.filter((item) =>
        [item.name, item.target, item.equipment, item.bodyPart].some((field) =>
          field?.toLowerCase().includes(search)
        )
      );

      setFilteredExercises(searchedExercises);
      setSearch("");
      window.scrollTo({ top: 1800, behaviour: "smooth" });
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          value={search}
          height="76px"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
