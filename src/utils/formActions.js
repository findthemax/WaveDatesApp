import {checkContent} from "./formFieldValidator";

export const setValue = (action, state) => {
    //create an errors array
    const errors = []

    //stop double spaces and get rid of leading space
    let value = action.value.replace("  ", " ").replace(/^\s/g, '')

    //if param is set to upper or lower case make val upper/lower
    if(state[action.data.param].uppercase) {
        value = value.toUpperCase()
    }
    if(state[action.data.param].lowercase) {
        value = value.toLowerCase()
    }

    //check if content is set to required and if it is check for content and then create error if necessary
    if(state[action.data.param].required) {
        const contentError = checkContent(value, action.data)
        if(contentError) {
            errors.push(contentError)
        }
    }

    //check for validation requirements and add any failures to the error array
    if(state[action.data.param].validate) {
        state[action.data.param].validate.forEach(val => {  const error = val.check(value, val.checkParams, val.msg, action.data)
            if (error) {errors.push(error)}})
    }

    //copy the state and modify it with the new value
    state =  {
        ...state,
    }
    state[action.data.param].value = value

    //check for existing errors for the param and replace with new errors
    if(errors.length > 0) {
        const otherParamErrors = state.errors.filter(error => error.param !== action.data.param && error)
        state.errors = [...otherParamErrors, ...errors]
    } else {
        state.errors = state.errors.filter(error => error.param !== action.data.param && error)
    }

    //if dropdown type menu, close the dropdown after value selection and make any alterations to required params
    if(action.data.type === 'dropdown') {
        //Required params - make certain parameters required on selection
        if(action.option && action.option.requiredParams) {
            action.option.requiredParams.forEach(param => {
                state[param].required = true
            })
        }
        if(action.option && action.option.unsetRequiredParams) {
            action.option.unsetRequiredParams.forEach(param => {
                state[param].required = false
            })
        }
        //Options in other dropdowns
        if(action.option && action.option.makeAvailable) {
            action.option.makeAvailable.forEach(opt => opt.values.forEach(val =>
                state[opt.param].options.find((obj) => {
                    if(obj.value === val) {
                        obj.available = true
                    }
                    }
                )
            ))
        }
        if(action.option && action.option.makeUnAvailable) {
            action.option.makeUnAvailable.forEach(opt => opt.values.forEach(val =>
                state[opt.param].options.find(obj => {
                        if(obj.value === val) {
                            obj.available = false
                        }
                    }
                )
            ))
        }

        state[action.data.param].showState = false
    }
    return state
}