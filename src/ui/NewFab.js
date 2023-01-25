//floating action button

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../redux/features/Slices/calendarSlice';
import { Button } from '@mui/material';

export const NewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(uiOpenModal());
  }

  return (
    <Button
      color="primary"
      variant="contained"
      sx={{
        borderRadius: '100%',
        bottom: '25px',
        right: '25px',
        position: 'fixed',
        padding: '10px'
      }}
      onClick={handleClick}
    >
      <AddIcon color='black' fontSize='large' />
    </Button >
  )
}
