import React from 'react'
import { Skeleton } from '@material-ui/lab'

const skeleton = () => {
  return (
    <div>
      <Skeleton variant='text' animation='wave' width='100%' height='5em' />
      <Skeleton variant='text' animation='wave' width='100%' height='5em' />
      <Skeleton variant='text' animation='wave' width='100%' height='5em' />
      <Skeleton variant='text' animation='wave' width='100%' height='5em' />
      <Skeleton variant='text' animation='wave' width='100%' height='5em' />
      <Skeleton variant='text' animation='wave' width='100%' height='5em' />
      <Skeleton variant='rect' animation='wave' width='100%' height='100vh' />
    </div>
  )
}

export default skeleton
