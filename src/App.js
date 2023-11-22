import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/dashboard/index.js';
import logo from './assets/logo.png';
import OnboardingCarousel from './components/onboarding';
import morningImage from './assets/bridge-morning.jpg';
import middayImage from './assets/bridge-midday.jpg';
import eveningImage from './assets/bridge-evening.jpg';

//import styles
import './App.css';
import './fonts/fonts.css';
import DashNav from './components/dash-nav';

const getCurrentBackgroundImage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
        return morningImage;
    } else if (currentHour >= 12 && currentHour < 18) {
        return middayImage;
    } else {
        return eveningImage;
    }
};

const App = () => {
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

    const handleOnboardingComplete = () => {
        setIsOnboardingComplete(true);
    };

    return (
        <BrowserRouter>
            <div className="App">
                {isOnboardingComplete ? (
                    <Home />
                ) : (
                    <OnboardingCarousel onComplete={handleOnboardingComplete} />
                )}
            </div>
        </BrowserRouter>
    );
};

const Home = () => {
    const [backgroundImage, setBackgroundImage] = useState(getCurrentBackgroundImage());

    useEffect(() => {
        const updateBackgroundImage = () => {
            setBackgroundImage(getCurrentBackgroundImage());
        };

        const intervalId = setInterval(updateBackgroundImage, 3600000); // Check every hour

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='container' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <NavBar />
            {/* <DashNav/> */}
        </div>
    );
};

const Ping = () => {
    const [notification, setNotification] = useState('');

    const handlePing = async () => {
        try {
            const response = await axios.get('/api/ping');
            setNotification(`Successful ping with response: ${response.data}`);
        } catch (e) {
            setNotification('Failed to ping');
        }

        setTimeout(() => setNotification(''), 2000);
    }

    return (
        <div>
            <NavBar />

            {/* <div>
                <p>{notification}</p>

                <button onClick={handlePing}>Ping</button>
            </div> */}
        </div>
    );
};

const NavBar = () => {
    const [dashboardVisible, setDashboardVisible] = useState(false);

    const toggleDashboard = () => {
        setDashboardVisible(!dashboardVisible);
    };
    return (
        <div className="nav-bar">
            <img src={logo} alt="Logo" className="logo" />
            <div className="black-bar-wrapper">
                <div className="black-bar">
                    <marquee behavior="scroll" direction="left" scrollamount="3">
                        Currently listening on 1 chain.
                    </marquee>
                </div>
            </div>
            <div className="square-container" onClick={toggleDashboard}></div>
            <Dashboard visible={dashboardVisible} />
        </div>
    );
};

export default App;