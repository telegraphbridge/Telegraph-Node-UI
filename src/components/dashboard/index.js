import React from 'react';
import './Dashboard.scss';
import Status from './status';
import Networks from './networks';

import statusIcon from '../../assets/icons/status.png';
import networksIcon from '../../assets/icons/networks.png';
import transactionsIcon from '../../assets/icons/transactions.png';
import chatIcon from '../../assets/icons/chat.png';

const Row = ({ label, onClick, active, icon }) => {
    return (
        <div className="dash-row" onClick={onClick}>
            <div className="column">
                <div className={`dash-circle${active ? ' active' : ''}`}>
                    <img src={icon} alt="status" />
                </div>
                <span className="label">{label}</span>
            </div>
        </div>
    );
};

const Dashboard = ({ visible }) => {
    const [activeIndex, setActiveIndex] = React.useState(null);
    const [showStatus, setShowStatus] = React.useState(false);
    const columnLabels = ["Status", "Networks", "Transactions", "Chat"];
    const selectedColumn = activeIndex !== null ? columnLabels[activeIndex] : "";

    const handleClick = (index) => {
        setActiveIndex(index);
        setShowStatus(index === 0);
    };

    return (
        <div className={`dashboard-container${visible ? ' visible' : ''}`}>
            <div className="columns">
                <Row
                    label="Status"
                    onClick={() => handleClick(0)}
                    active={activeIndex === 0}
                    icon={statusIcon}
                />
                <Row
                    label="Networks"
                    onClick={() => handleClick(1)}
                    active={activeIndex === 1}
                    icon={networksIcon}
                />
                <Row
                    label="Transactions"
                    onClick={() => handleClick(2)}
                    active={activeIndex === 2}
                    icon={transactionsIcon}
                />
                <Row
                    label="Chat"
                    onClick={() => handleClick(3)}
                    active={activeIndex === 3}
                    icon={chatIcon}
                />
            </div>
            <div className="selected-column">
                {selectedColumn && (
                    <div key={selectedColumn} className="selected-column-text">
                        {selectedColumn}
                    </div>
                )}
            </div>
            {/* {showStatus && ( // Render the Status component conditionally
                <div className="status-slide-in">
                    <Status />
                </div>
            )} */}
            {activeIndex === 0 && (
                <div className="status-slide-in">
                    <Status />
                </div>
            )}
            {activeIndex === 1 && (
                <div className="status-slide-in">
                    <Networks />
                </div>
            )}
        </div>
    );
};

export default Dashboard;