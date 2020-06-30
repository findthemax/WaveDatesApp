import {
    GET_WEATHER,
    GET_LOCATIONS, GET_LOCATIONS_FAIL, CLEAR_SEARCH
} from '../actions/types'

const initialState = {
    loading: true,
    locations: [],
    error: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_LOCATIONS:
            return {
                ...state,
                loading: false,
                locations: payload,
                error: false,
            }
        case GET_LOCATIONS_FAIL:
            return {
                ...state,
                loading: false,
                locations: [],
                error: true,
            }
        case GET_WEATHER:
            state = {
                ...state,
            }
            let index = state.locations.findIndex(loc => loc._id === payload._id)
            state.locations[index] = payload
            return state
        case CLEAR_SEARCH:
            return {
                ...state,
                loading: true,
                locations: [],
                error: false
            }
        default:
            return state
    }
}