import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

export const BirthdayTable = () => {

    const { pacientes } = useSelector( state => state.profesional );

    const now = moment().dayOfYear();


    const birthdaysSevenDaysFromNow = pacientes
    .filter( p =>  p.datosFiliatorios!== null)
    .filter( f => f.datosFiliatorios.fechaNacimiento !== null)
    .filter( (d)=>{

      const dayOfYearNacimiento = moment(d.datosFiliatorios.fechaNacimiento).dayOfYear();

      if(dayOfYearNacimiento > 355 && now < 7 ){
        return (moment(dayOfYearNacimiento).dayOfYear() - (now + 365)) < 7
      }
      if(dayOfYearNacimiento < 7 && now > 355){
        return ((moment(dayOfYearNacimiento).dayOfYear() + 365) - (now )) < 7
      }
      console.log(moment( dayOfYearNacimiento - now));

       return (dayOfYearNacimiento- now) < 7 
    
    })

    console.log(birthdaysSevenDaysFromNow);
  return (
    <div>Birthday</div>
  )
}
