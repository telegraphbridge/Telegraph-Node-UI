//baseic react component

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Networks from '../networks';
import Status from '../status';
import Transactions from '../transactions';

//import styles
import './styles.scss';

const DashNav = () => {
    const [isClosed, setIsClosed] = useState(false);
    const [currentTab, setCurrentTab] = useState('status');
    //move container on click
    const moveContainer = (e) => {
        const container = document.getElementById('dash');
        if (isClosed) {
            container.style.top = '0';
            setIsClosed(false);
        } else {
            container.style.top = '-100%';
            setIsClosed(true);
        }
    }

    //change current tab
    const changeTab = (e) => {
        console.log(e.target.value);
        setCurrentTab(e.target.value);
    }

    var conn;
    var msg = document.getElementById("msg");
    var log = document.getElementById("log");

    function appendLog(item) {
        var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        log.appendChild(item);
        if (doScroll) {
            log.scrollTop = log.scrollHeight - log.clientHeight;
        }
    }

    const connectWebsocket = () => {
        console.log("Websocket", window["WebSocket"]);
        if (window["WebSocket"]) {
            conn = new WebSocket("ws://127.0.0.1:7044" + "/ws");
            conn.onclose = function (evt) {
                var item = document.createElement("div");
                item.innerHTML = "<b>Connection closed.</b>";
                appendLog(item);
            };
            conn.onmessage = function (evt) {
                var messages = evt.data.split('\n');
                for (var i = 0; i < messages.length; i++) {
                    var item = document.createElement("div");
                    item.innerText = messages[i];
                    appendLog(item);
                }
            };
        } else {
            var item = document.createElement("div");
            item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
            appendLog(item);
        }
    }

    connectWebsocket();


    return (
        <div className='dash-box'>
            <div id='toggle' className='toggle' onClick={(e) => moveContainer(e)}>

            </div>
            <div id='dash' className='dash-container'>

                {/* select dropdown */}
                <div className='select-container'>
                    <select className='select' onChange={(e) => {changeTab(e)}}>
                        <option selected value='status'>STATUS</option>
                        <option value='networks'>NETWORKS</option>
                        <option value='transactions'>TRANSACTIONS</option>
                        <option value='chat'>CHAT</option>
                    </select>
                </div>
                {currentTab === 'status' ? <Status /> : null}
                {currentTab === 'networks' ? <Networks /> : null}
                {currentTab === 'transactions' ? <Transactions /> : null}
                
            </div>
        </div>

    );
}

export default DashNav;
