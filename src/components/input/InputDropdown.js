import React, {Fragment, useState} from 'react';

const InputDropdown = ({data, dispatch, errors, ...props}) => {

    const {param, label, value, showState, options, chosen} = data
    const {dispatchRedux} = props

    let optionLabel = ''
    if(value) {
        const opt = options.find(opt => opt.value === value);
        if(opt) {
            optionLabel = opt.label
        }
    }

    const [infoShow, setInfoShow] = useState(false)

    const errorArray = errors.filter(error => error.param === data.param && error)

    return (
        <Fragment>
            <div className={errorArray.length > 0 ? "input-dropdown it-error" : "input-dropdown"}>
                <label htmlFor={param}>
                    { data.required &&
                    <i className="fas fa-asterisk required-icon" />
                    }
                    {label}
                    { data.info &&
                    <i
                        className="fas fa-info-circle info-icon"
                        onMouseEnter={() => setInfoShow(true)}
                        onMouseLeave={() => setInfoShow(false)}
                        onClick={() => setInfoShow(!infoShow)}
                    />
                    }
                </label>
                <div className="dropdown-header" id={param} onClick={() => dispatch({type: "toggleShow", param})}>
                    <p>{optionLabel}</p>
                    <i className="fas fa-caret-down" />
                </div>
                <ul className="dropdown-list" style={showState ? { display: "flex" } : { display: "none" }}>
                    {options.map(option => option.available && <li key={option.label} onClick={() => dispatch({type: "getLocation", lat: option.value.lat, long: option.value.long, data, option, dropdown: true, dispatchRedux})}>{option.label}</li>)}
                </ul>
                <div className="input-errors-container">
                    {errorArray.map(error => <p key={error.msg} className="input-error">{error.msg}</p>)}
                </div>
                {data.info && infoShow &&
                <div className="input-info-container">
                    <p className="input-info">{data.info}</p>
                </div>
                }
            </div>
        </Fragment>
    );
};

export default InputDropdown;