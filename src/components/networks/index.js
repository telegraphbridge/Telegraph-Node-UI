//baseic react component

import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import styles
import './styles.scss';

const EditNetwork = ({ close, network, isEditing }) => {

    //send new network to localhost 7044
    const confirmEdit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('edit-name').value;
        const chainid = document.getElementById('edit-id').value;
        const chaintype = document.getElementById('edit-chaintype').value;
        const contractaddress = document.getElementById('edit-address').value;
        const evmhttpurl = document.getElementById('edit-http').value;
        const evmwssurl = document.getElementById('edit-wss').value;
        const newNetwork = {
            _id: network._id,
            name,
            chainid,
            chaintype,
            contractaddress,
            evmhttpurl,
            evmwssurl
        }

        console.log(newNetwork);
        if (isEditing) {
            axios.put('http://127.0.0.1:7044/network', newNetwork)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            axios.post('http://127.0.0.1:7044/network', newNetwork)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div id='edit-box' className='edit-box'>
            {isEditing ? <h3>Edit Network</h3>
                :
                <h3>Add Network</h3>}
            <div className='network-name'>
                <label htmlFor='network-name'>Network Name</label>
                <input id='edit-name' type='text' defaultValue={network.name} />
            </div>
            <div className="network-chainid">
                <label htmlFor='network-name'>Chain Id</label>
                <input id='edit-id' type='number' defaultValue={network.chainid} />
            </div>
            <div className="network-chaintype">
                <label htmlFor='network-name'>Chain Type</label>
                <input id='edit-chaintype' type='text' defaultValue={network.chaintype} />
            </div>
            <div className="network-address">
                <label htmlFor='network-name'>Address</label>
                <input id='edit-address' type='text' defaultValue={network.contractaddress} />
            </div>
            <div className="network-http">
                <label htmlFor='network-name'>HTTP URL</label>
                <input id='edit-http' type='text' defaultValue={network.evmhttpurl} />
            </div>
            <div className="network-wss">
                <label htmlFor='network-name'>WSS URL</label>
                <input id='edit-wss' type='text' defaultValue={network.evmwssurl} />
            </div>

            {/* buttons for cancel and confirm */}
            <div className='network-buttons'>
                <button className='cancel' onClick={() => { close() }}>Cancel</button>
                <button className='confirm' onClick={(e) => { confirmEdit(e) }}>Confirm</button>
            </div>
        </div>
    )
}

const Networks = () => {
    //get networks from localhost 7044
    const [networks, setNetworks] = useState([]);
    const [currentNetwork, setCurrentNetwork] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:7044/network')
            .then(res => {
                console.log(res);
                setNetworks(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    //edit network
    const editNetwork = (e, network) => {
        console.log('editing')
        if (network) {
            setCurrentNetwork(network);
        }
        const editBox = document.getElementById('edit-box');
        if (isEditing) {
            editBox.style.top = '-120%';
            setIsEditing(false);
        } else {
            editBox.style.top = '0';
            setIsEditing(true);
        }
    }

    //delete network
    const deleteNetwork = (e, network) => {
        console.log(network._id)
        console.log('deleting')
        axios.delete(`http://127.0.0.1:7044/network?id=${network._id}`)
    }


    return (
        <div className='network-container'>
            <div>
                <EditNetwork close={(e) => editNetwork(e)} network={currentNetwork} isEditing />
                <button className='network-add' onClick={(e) => { editNetwork(e, {}, false) }}>
                    Add Network
                </button>
                {networks.map((network, index) => {
                    return (
                        <div className='network' key={index}>
                            <div className='network-edit' onClick={(e) => { editNetwork(e, network) }}></div>
                            <div className='network-delete' onClick={(e) => { deleteNetwork(e, network) }}></div>

                            <div className='network-name'>
                                <h3>{network.name}</h3>
                            </div>
                            <div className="network-chainid">
                                <h4>ChainId: {network.chainid}</h4>
                            </div>
                            <div className="network-chaintype">
                                <h4>Chain Type: {network.chaintype}</h4>
                            </div>
                            <div className="network-address">
                                <h4>Address: {network.contractaddress}</h4>
                            </div>
                            <div className="network-http">
                                <h4>HTTP: {network.evmhttpurl}</h4>
                            </div>
                            <div className="network-wss">
                                <h4>WSS: {network.evmwssurl}</h4>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Networks;
