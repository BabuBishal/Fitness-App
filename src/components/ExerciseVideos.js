import { Box } from '@mui/material'
import React from 'react'
react {Box, Stack, Typography} from '@mui/material'

const ExerciseVideos = ({exerciseVideos, name}) => {
  return (
    <Box
      sxx={{
        marginTop:{lg:'200px', xs:'20px'}
      }}
      p='20px'
    >
      <Typography variant='h3' mb='33px'>
        Watch <span style={{color:'#ff2625', textTransform:'capitalize'}}>{name}</span> exercise videos
      </Typography>
      <Stack
        justifyContent='flex-start' flexWrap='wrap' alignItems='center'
        sx={{
          flexDirecton: {lg:'row'},
          gap: {lg:'110px', xs:'0'}
        }}
      >

      </Stack>
    </Box>
  )
}

export default ExerciseVideos
