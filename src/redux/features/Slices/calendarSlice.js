
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConTokenMethod } from '../../../api/requestApi';
import { prepareEvents } from '../../../helppers/prepareEvents';
import { ip } from '../../../ip';


const initialState = {
    events: [],
    activeEvents: null,
    modalOpen: false

}



export const startLoadingEvents = createAsyncThunk(
    'calendar/startLoadingEvents',
    async (profesionalId, thunkAPI) => {



        const url = `http://${ip}:8080/api/calendario/all/${profesionalId}`

        const respuesta = await fetchConTokenMethod(url, null, 'GET');


        if (respuesta) {

            thunkAPI.dispatch(eventsLoaded(respuesta));
        } else {
            console.log('------------------------------------');

        }
        });

export const startAddNewEvent = createAsyncThunk(
    'calendar/startAddNewEvent',
    async (event, thunkAPI) => {

        try {
            const url = `http://${ip}:8080/api/calendario/eventoCita`

            console.log('new event');
            const respuesta = await fetchConTokenMethod(url, event, 'POST');

            thunkAPI.dispatch(eventsLoaded(respuesta));
            return respuesta;

        } catch (error) {
            console.error(error);
        }
    });

export const startDeleteEvent = createAsyncThunk(
    'calendar/startDeleteEvent',
    async (data) => {

        const { eventId, profesionalId } = data;
        try {
            const url = `http://${ip}:8080/api/calendario/eventoCita/${eventId}/${profesionalId}`

            const respuesta = await fetchConTokenMethod(url, eventId, 'Delete');

            return respuesta;

        } catch (error) {
            console.error(error);
        }
    });


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        clearActiveNote: (state) => {
            state.activeEvents = null;

        },
        calendarEventSetActive: (state, action) => {
            state.activeEvents = action.payload
        },
        eventsLoaded: (state, action) => {
            const preparedEvents = prepareEvents(action.payload);
            state.events = preparedEvents;
          
        },
        uiOpenModal: (state) => {
            state.modalOpen = true
        },
        uiCloseModal: (state) => {
            state.modalOpen = false
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(startLoadingEvents.pending, (state) => {

                console.log('pendingEvents');
            })
            .addCase(startLoadingEvents.fulfilled, (state, action) => {


                console.log('fulfilledLoadingEvents');


            }).addCase(startLoadingEvents.rejected, (state) => {

                state.events = [];
                console.log('rejectedEvents');

            }).addCase(startAddNewEvent.pending, (state) => {

                console.log('pendingnewEvent');
            })
            .addCase(startAddNewEvent.fulfilled, (state, action) => {


                console.log('fulfilledaddNewEvent');


            }).addCase(startAddNewEvent.rejected, (state) => {
                console.log('rejectednewEvent');

            }).addCase(startDeleteEvent.pending, (state) => {

                console.log('pendingnewEvent');
            })
            .addCase(startDeleteEvent.fulfilled, (state, action) => {
            

                console.log('fulfilledLoadingNewEvent');


            }).addCase(startDeleteEvent.rejected, (state) => {
                console.log('rejectednewEvent');
            });
    },
});

export const { clearActiveNote, calendarEventSetActive, uiOpenModal, uiCloseModal, eventsLoaded } = calendarSlice.actions;

export const selectEvent = (state) => state;


export default calendarSlice.reducer;