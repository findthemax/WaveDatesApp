//Checks if a param is required and if it is it will check that there is content selected
//Returns an array of errors
export const checkEmptyParams = state => {
    const emptyErrors = []
    Object.keys(state).forEach(key => {
        state[key].required && state[key].value === '' && emptyErrors.push({
            src: 'form', msg: `Please enter a value for ${state[key].label}`, param: key, label: state[key].label
        })
    })

    return emptyErrors
}

export const setBtnOpacity = state => {
    if(state.errors.length > 0 || state.emptyErrors.length > 0) {
        return .5
    }

    return 1
}