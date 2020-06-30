import React from 'react';
import WaveSearch from "./components/WaveSearch";

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="hero-head">
                <h1>It's Time to Hook Up With Your Ideal Waves</h1>
            </div>
            <WaveSearch />
        </div>
    );
};

export default Homepage;
