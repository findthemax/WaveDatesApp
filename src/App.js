import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./components/homepage/Homepage";


//Google Analytics
import ReactGA from 'react-ga';

//Redux
import { Provider } from 'react-redux'
import store from './store'

//Styles
import 'normalize.css/normalize.css'
import './App.scss';

ReactGA.initialize('G-1JJ6N5QH8X', {
    siteSpeedSampleRate: 100
});
ReactGA.pageview(window.location.pathname + window.location.search);


const App = ()  => {

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Header/>
                    <Route exact path="/" component={Homepage} />
                    <Footer/>
                </Fragment>
            </Router>
        </Provider>
    )
}


export default App;
