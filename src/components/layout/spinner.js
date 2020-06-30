import spinner from './spinner.gif'
import React, {Fragment} from "react";

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{width: '100px', margin: 'auto', display: 'block'}}
            alt='Loading...'
        />
    </Fragment>
);