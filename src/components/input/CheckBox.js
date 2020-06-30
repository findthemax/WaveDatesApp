import React, {Fragment, useState} from 'react';

const CheckBox = ({data, dispatch, errors, ...props}) => {

    const errorArray = errors.filter(error => error.param === data.param && error)
    const [infoShow, setInfoShow] = useState(false)

    return (
        <Fragment>
            <div className={errorArray.length > 0 ? "checkbox it-error" : 'checkbox'}>
                <p> { data.required &&
                        <i className="fas fa-asterisk required-icon" />
                    }
                    { data.info &&
                        <i
                            className="fas fa-info-circle info-icon"
                            onMouseEnter={() => setInfoShow(true)}
                            onMouseLeave={() => setInfoShow(false)}
                            onClick={() => setInfoShow(!infoShow)}
                        />
                    }
                    {data.content.map((data, index) => {
                        // return <Fragment key={index}>data</Fragment>
                        return data
                    })}
                </p>
                <div className="checkbox-box">
                    {data.value === '' ?
                        <i className={errorArray.length > 0 ? "far fa-square error" : 'far fa-square'} onClick={() => dispatch({type: 'setValue', value: "checked", data})} />
                        :
                        <i className="fas fa-check-square" onClick={() => dispatch({type: 'setValue', value: "", data})} />
                    }
                </div>
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


export default CheckBox;
