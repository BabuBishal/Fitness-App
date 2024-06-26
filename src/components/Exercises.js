import React, {useState, useEffect} from 'react'
import {Pagination} from '@mui/material'
import {Box, Stack, Typography} from '@mui/material'

// import { exerciseOptions, fetchData } from '../utils/fetchData'
import ExerciseCard from './ExerciseCard'

const Exercises = ({exercises}) => {
  // console.log(exercises)
  const [currentPage, setCurrentPage] = useState(1)
  const exercisePerPage = 9
  const indexOfLastExercise = currentPage *exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;

  const currentExercise = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  console.log(exercises)
  console.log(currentExercise)
  const paginate = (e, value)=> {
    setCurrentPage(value);

    window.scrollTo({top:1800, behavior:'smooth'});
  }

    return (
    <Box
      id='exercises'
      sx={{
        mt:{lg:'110px'}
      }}
      mt='50px'
      p='20px'
    >
      <Typography variant='h3' mb='46px'>
        Showing Results
      </Typography>
      <Stack
        direction='row'
        sx={{
          gap: { lg:'110px', xs:'50px'}
        }}
        flexWrap='wrap'
        justifyContent='center'
      >
        {currentExercise?.map((exercise, index) =>(
          <ExerciseCard key={index} exercise={exercise} />
        )
        )}
      </Stack>
      <Stack mt='100px' alignItems='center'>
      
          {exercises?.length > 9 && (
            <Pagination
              color='standard'
              shape='rounded'
              defaultPage={1}
              count={Math.ceil(exercises.length/9)}
              page={currentPage}
              onChange={paginate}
              size='large'
            />

          )}
      </Stack>
    </Box>
  )
}

export default Exercises
