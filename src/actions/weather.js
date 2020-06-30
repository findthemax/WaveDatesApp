import axios from 'axios'
import {
    GET_LOCATIONS,
    GET_LOCATIONS_FAIL,
    GET_WEATHER,
    WaveApi } from "./types";

export const getLocations = data => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify(data)

        const res = await axios.post(WaveApi+'/locations', body, config)

        dispatch({
            type: GET_LOCATIONS,
            payload: res.data
        })

    } catch (err) {
        const errors = err
        console.log(err);
        if(errors) {
            dispatch({
                type: GET_LOCATIONS_FAIL,
                // payload: errors
            })
        }
    }
}

export const getWeather = data => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({locationId: data})

        const res = await axios.post(WaveApi+'/locations/weather', body, config)

        dispatch({
            type: GET_WEATHER,
            payload: res.data
        })

    } catch (err) {
        const errors = err
        console.log(err);
        if(errors) {
            dispatch({
                type: GET_LOCATIONS_FAIL,
                // payload: errors
            })
        }
    }
}