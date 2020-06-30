import React, { Fragment }  from 'react';
import Moment from "react-moment";

const Footer = props => {
    const date = new Date()
    return (
        <Fragment>
            <footer className={"footer"} id="footer">
                <section>
                    <h3>Wave Dates</h3>
                    <p>CORNWALL</p>
                </section>


                <p>&#169; Copyright Wave Dates <Moment format={"YYYY"} date={date}/></p>

            </footer>
        </Fragment>

    )
};

export default Footer;
