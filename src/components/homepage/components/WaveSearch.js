import React, {Fragment, useEffect, useReducer} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {setValue} from "../../../utils/formActions";
import SkillSelect from "./SkillSelect"
import {getLocations} from "../../../actions/weather";
import Spinner from "../../layout/spinner";
import InputDropdown from "../../input/InputDropdown";
import LocationCard from "./LocationCard";
import CheckBox from "../../input/CheckBox";

function reducer(state, action) {
    switch (action.type) {
        case 'setValue' :
            state = setValue(action, state)
            break
        case 'setImgSelect':
            state =  {
                ...state,
                skill: action.value
            }
            state.skillLevels.map(level => {
                level.selected = level.label === action.value
                return level
                });
            break
        case 'toggleShow':
            state =  {
                ...state,
            }
            state[action.param].showState = !state[action.param].showState
            break
        case 'getLocation':
            state = {...state, searchState: true}
            state.counties.showState = false
            if(action.dropdown) {
                const dt = state.driveTime.value === 'checked'
                state.counties.value = action.option.value
                action.dispatchRedux(getLocations({
                    customerLat: action.lat,
                    customerLong: action.long,
                    driveTime: dt,
                }))
            } else {
                if(!navigator.geolocation) {
                    state.counties.errors = [{msg: "Geolocation is unfortunately not supported by your browser"}]
                } else {
                    const success = position => {
                        const dt = state.driveTime.value === 'checked'
                        action.dispatchRedux(getLocations({
                            customerLat: position.coords.latitude,
                            customerLong: position.coords.longitude,
                            driveTime: dt,
                        }))
                    }
                    const error = () => {
                        state.counties.errors = [{msg: "Geolocation has been unable to get your location"}]
                    }
                    navigator.geolocation.getCurrentPosition(success, error)

                }
            }
            break
        case 'reduxErrors':
            state = {
                ...state,
                errors: action.errors
            }
            break
        default :
            state =  {
                ...state
            }
    }
    return state
}

const initialState = {
    skillLevels: [
        {
            label: "Novice",
            img: require('../../../img/icons/novice.icon.png'),
            selected: false
        },
        {
            label: "Intermediate",
            img: require('../../../img/icons/intermediate.icon.png'),
            selected: true
        },
        {
            label: "Expert",
            img: require('../../../img/icons/expert.icon.png'),
            selected: false
        },

    ],
    skill: "Intermediate",
    location: {
        type: 'text',
        param: 'location',
        value: '',
        label: "Your Location",
        alignment: 'right',
        required: true,
        content: [' I agree to the ', <Link to={"/terms_conditions"} target="_blank">Terms and Conditions</Link>]
    },
    counties: {
        type: 'dropdown',
        param: 'counties',
        value: "",
        chosen: "",
        showState: false,
        options: [
            {label: "Del Norte", value: {lat: "41.86938356954192", long: "-124.2144472484002"}, available: true},
            {label: "Humboldt", value: {lat: "40.76474127411608", long: "-124.2457464202994"}, available: true},
            {label: "Los Angeles", value: {lat: "34.03433174410338", long: "-118.8611824726196"}, available: true},
            {label: "Marin", value: {lat: "38.25173671724974", long: "-122.9722060745764"}, available: true},
            {label: "Mendocino", value: {lat: "39.65912294504096", long: "-123.7857418990746"}, available: true},
            {label: "Monterey", value: {lat: "36.27927929197821", long: "-121.8591275249395"}, available: true},
            {label: "Orange County", value: {lat: "33.73602255134904", long: "-118.1015971818255"}, available: true},
            {label: "San Diego", value: {lat: "33.18560497984529", long: "-117.37826775154"}, available: true},
            {label: "San Francisco", value: {lat: "37.77748633115122", long: "-122.5158257105333"}, available: true},
            {label: "San Luis Obispo", value: {lat: "35.76567413753583", long: "-121.32606704534"}, available: true},
            {label: "San Mateo", value: {lat: "37.11763256378267", long: "-122.3144829358251"}, available: true},
            {label: "Santa Barbara", value: {lat: "34.463609035485", long: "-120.10097747039"}, available: true},
            {label: "Santa Cruz", value: {lat: "37.10437578582472", long: "-122.2896309983957"}, available: true},
            {label: "Sonoma", value: {lat: "38.68314038005085", long: "-123.4343167105767"}, available: true},
            {label: "Ventura", value: {lat: "34.37310576910677", long: "-119.4599428547951"}, available: true},
        ],
        errors: [],
    },
    driveTime: {
        type: 'checkbox',
        param: 'driveTime',
        value: '',
        label: "Drive Time",
        info: 'Please only select if you are in the USA!',
        alignment: 'right',
        required: false,
        content: ['I am in the USA and want travel time!']
    },
    errors: [],
    searchState: false
}

const WaveSearch = () => {

    const [ state, dispatch ] = useReducer(reducer, initialState)

    const dispatchRedux = useDispatch()
    const locationState = useSelector(state => state.weather)


    useEffect(() => {
        // console.log(locationState);
    }, [locationState])

    return (
        <Fragment>
            <div className="intro">
                <div className="intro-text">
                    <h1>Yo Dude!</h1>
                    <h1>Want to find your perfect wave for today?</h1>
                    <p>Wave Dates is a dating site with a difference: we match you with your soulwaves. Just tell us a bit about yourself and we will find the ideal beach for you to find your perfect wave.</p>
                    <p>Whatever your ability or location we've got you covered. You won't be out of your depth and you won't be heading to the wrong beach.</p>
                    <p>What are you waiting for dude... Let's hit the surf before your perfect wave gets away.</p>
                </div>
            </div>
            <div className="skill">
                <h1>What is your skill level?</h1>
                <p>We use this to make sure you're safe. If you are surfing in a group make sure you answer for the person with the least amount of experience!</p>
                <SkillSelect
                    data={state.skillLevels}
                    dispatch={dispatch}
                    type={'setImgSelect'}
                />
            </div>
            <div className="location">
                <h1>Where are you?</h1>
                <p>So that we can find the spots you can access today select a County or use the locate me button to get a super accurate location. Don't worry we are 'namers' so we WILL show you the secret spots.</p>
                <CheckBox
                    data={state.driveTime}
                    dispatch={dispatch}
                    errors={state.errors}
                />
                <InputDropdown
                    data={state.counties}
                    dispatch={dispatch}
                    errors={state.counties.errors}
                    dispatchRedux={dispatchRedux}
                    />
                    <h3>Or</h3>
                <button className="btn" onClick={() => {
                    dispatch({type: 'getLocation', dispatchRedux})
                }}>Locate Me</button>


            </div>

            <div className="results">
                {
                    state.searchState && locationState.loading ? <Spinner/> :
                        locationState.locations.length < 1 ? state.searchState ? <p>There are no locations that match your search :(</p> : <p>Please choose enter a location to search</p> :
                            locationState.locations.map(location =>
                                <LocationCard
                                    key={location._id}
                                    data={location}
                                    dispatch={dispatch}
                                    skill={state.skill}
                                />
                                )
                }
            </div>

        </Fragment>
    )
}


export default WaveSearch
