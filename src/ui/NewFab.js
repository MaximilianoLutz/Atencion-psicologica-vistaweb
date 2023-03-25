//floating action button

import React from 'react';
//import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../redux/features/Slices/calendarSlice';

export const NewFab = () => {
    const dispatch = useDispatch();

    const handleClick = ()=>{
        dispatch( uiOpenModal() );
    }

  return (
    <button
            className='btn btn-primary fab'
            onClick={ handleClick }
    >
        {/* <AddIcon color='primary' fontSize='small' /> */}
        <i className='fas fa-plus'></i>

    </button>
  )
}
