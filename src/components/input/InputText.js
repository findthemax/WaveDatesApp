import React, {Fragment, useState} from 'react';

const InputText = ({data, dispatch, errors, ...props}) => {

    const {type, param, label, value, required} = data

    const onChange = e => dispatch({data, type: data.dispatchType, value: e.target.value})

    const errorArray = errors.filter(error => error.param === data.param && error)
    const [infoShow, setInfoShow] = useState(false)

    return (
        <Fragment>
            <div className={errorArray.length > 0 ? "input-text it-error" : 'input-text '}>
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
                <input
                    id={param}
                    type={type}
                    name={param}
                    value={value}
                    onChange={onChange}
                    required={required}
                    {...props} />
            </div>
            <div className="input-errors-container">
                {errorArray.map(error => <p key={error.msg} className="input-error">{error.msg}</p>)}
            </div>
            {data.info && infoShow &&
                <div className="input-info-container">
                    <p className="input-info">{data.info}</p>
                </div>
            }

        </Fragment>
    );
};

export default InputText
