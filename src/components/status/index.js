import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import styles
import './styles.scss';

const Status = () => {
    const [status, setStatus] = useState({
        myNetworkTime: '',
        totalNetworkTime: '',
        publicKey: ''
    });

    //get amount of time between two timestamps
    const getTime = (time) => {
        //convert unix time to date
        const date = new Date(time * 1000);
        //get current date
        const now = new Date();
        // get the difference in minutes
        const diff = Math.floor((now - date) / 1000 / 60);
        return diff;
    }

    //format commas in numbers
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:7044/status')
            .then(res => {
                console.log(res);
                
                setStatus({
                    myNetworkTime: getTime(res.data.myNetworkTime),
                    totalNetworkTime: getTime(res.data.totalNetworkTime),
                    publicKey: res.data.publicKey
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, []);



    return (
        <div className='status-container'>
            <div className='status'>
                <u><h3>Public Key:</h3></u>
                <h3>{status.publicKey}</h3>
            </div>
            <div className='status'>
                <u><h3>My Network Time:</h3></u>
                <h3>{formatNumber(status.myNetworkTime)} Minutes</h3>
            </div>
            <div className='status'>
                <u><h3>Total Network Time: </h3></u>
                <h3>{formatNumber(status.totalNetworkTime)} Minutes</h3>
            </div>
            <div className='status'>
                <u><h3>Network Ownership: </h3></u>
                <h3>01234567</h3>
            </div>
        </div>
    )
}

export default Status;