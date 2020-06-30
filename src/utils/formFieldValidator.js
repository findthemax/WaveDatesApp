export const checkContent = (value, data) => {
    if(value.trim().length < 1) {
        return {src: "form", msg: `Please enter a value for ${data.label}`, param: data.param, label: data.label}
    }
}

export const checkLengthMin = (value, checkParams, msg, data) => {
    if(checkParams.trim) {
        value = value.trim()
    }
    if(value.length < checkParams.length) {
        return {src: "form", msg, param: data.param, label: data.label}
    }
}

export const checkLengthMax = (value, checkParams, msg, data) => {
    if(checkParams.trim) {
        value = value.trim()
    }
    if(value.length > checkParams.length) {
        return {src: "form", msg, param: data.param, label: data.label}
    }
}

export const checkEmailBasic = (value, checkParams, msg, data) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(value).toLowerCase())) {
        return {src: "form", msg, param: data.param, label: data.label}
    }
}

export const checkPostcodeBasic = (value, checkParams, msg, data) => {
    const re = /^[a-zA-Z0-9 ]+$/
    if(!re.test(String(value)) || value.length < 5 || value.length > 8) {
        return {src: "form", msg, param: data.param, label: data.label}
    }
}