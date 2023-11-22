import React, { useEffect, useState } from 'react';
import axios from 'axios';

//import styles
import './styles.scss';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [ticking, setTicking] = useState(true),
        [count, setCount] = useState(0)


    useEffect(() => {
        axios.get('http://127.0.0.1:7044/transaction')
            .then(res => {
                console.log(res);
                setTransactions(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            ticking && setCount(count + 1);

        }, 30000)
        return () => clearTimeout(timer)

    }, [count, ticking]);

    const lastFour = (str) => {
        return str.slice(-4);
    }

    const toggleDetails = (index) => {
        // console.log parent siblings
        const detail = document.getElementById(`transaction-detail-${index}`);
        detail.classList.toggle('show');


    }
    // loop through transactions and display them
    // each transaction should have a details section that is hidden by default
    return (
        <div className='transactions-container'>
            <h1>Transactions</h1>
            <div className='transactions'>
                {transactions.map((transaction, index) => {
                    return (
                        <div className='transaction' key={index}>
                            {/* create table with sender, start chain, and end chain headers */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sender</th>
                                        <th>Start Chain</th>
                                        <th>End Chain</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{lastFour(transaction.sender)}</td>
                                        <td>{transaction.startchain}</td>
                                        <td>{transaction.endchain}</td>
                                        <div>
                                            <button onClick={(e) => { toggleDetails(index) }}>Details</button>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>

                            <div id={`transaction-detail-${index}`} className='transaction-details'>
                                <p>Block Number: {transaction.blocknumber}</p>
                                <p>Detection Time: {transaction.detectiontime}</p>
                                <p>Signature: 789</p>
                                <p>Start Hash: {transaction.hash}</p>
                                {transaction.signers ?
                                    <p>Signers: {transaction.signers.length}</p>
                                    :
                                    null
                                }
                                <p>Sender: {transaction.sender}</p>
                                <p>Destination address: {transaction.destination}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Transactions;