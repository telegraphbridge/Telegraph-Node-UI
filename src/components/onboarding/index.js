import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
    getMyValidator, createValidator, getWallet,
    getNetworks, createNetwork, checkIfSigner
} from '../../api/api';

import Page from './Page';
import ValidatorForm from './ValidatorForm';
import WalletInfo from './WalletInfo';
import NetworkForm from './NetworkForm';

import './styles.css';
import NumberedRows from './NumberedRows';

import FinalPage from './FinalPage';

const OnboardingScreen = ({ onComplete }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canAdvance, setCanAdvance] = useState(true);
    const [showValidatorForm, setShowValidatorForm] = useState(false);
    const [showNetworkForm, setShowNetworkForm] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [showSignerForm, setShowSignerForm] = useState(false);
    const [networks, setNetworks] = useState([]); 
    const [pages, setPages] = useState([
        {
            title: 'Hi there!',
            placeholder: "Welcome to the Telegraph onboarding process. Let\'s get started!",
        },
        {
            title: "First off, let's check if you've already made a validator",
            placeholder: 'Should only take a few seconds...',
        },
        {
            title: "You're in! But do you have a blockchain provider added?",
            placeholder: 'Doing some quick checks...',
        },
        {
            title: "Now searching alternate dimensions for your node's wallet address",
            placeholder: "Disentangling the fabric of reality...",
        },
        {
            title: "Awesome! Now let's see if your public key is already registered",
            placeholder: 'Communicating with the ETH blockchain...',
        },
        {
            title: "You're good to go!",
            placeholder: '...',
        }

    ]);
    const [hideOnboarding, setHideOnboarding] = useState(false);

    useEffect(() => {
        if (currentPage === 5) {
            const timeoutId = setTimeout(() => {
                setHideOnboarding(true);
                setTimeout(() => {
                    onComplete();
                }, 500);
            }, 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [currentPage]);


    useEffect(() => {

    }, [pages]);

    useEffect(() => {
        if (currentPage === 1) {
            handleNext();
        }
    }, [canAdvance]);

    const pageAPICheck = async () => {
        switch (currentPage + 1) {
            case 1:
                return page1Check();
            case 2:
                return page2Check();
            case 3:
                return page3Check();
            case 4:
                return page4Check();
        }
    };

    const page1Check = async () => {
        setCanAdvance(false);
        const response = await getMyValidator();
        console.log('response', response);
        if (!response) {
            setTimeout(() => {
                const updatedPages = pages.map((page, index) => {
                    if (index === 1) {
                        return {
                            ...page,
                            title: "Looks like you don't have a validator yet.",
                            placeholder: "Provide the info below to create one."
                        };
                    }
                    return page;
                });
                setPages(updatedPages);
                setShowValidatorForm(true);
            }, 2000);
            return;
        }
        if (response) {
            console.log('response', response);
            setTimeout(() => {
                setCanAdvance(true);
                const updatedPages = pages.map((page, index) => {
                    if (index === 1) {
                        return {
                            ...page,
                            title: "EZ, you're all set.",
                            placeholder: "Let's move on to the next step."
                        };
                    }
                    return page;
                });
                setPages(updatedPages);
            }, 2000);

        }
    }

    const page2Check = async () => {
        setCanAdvance(false);
        const response = await getNetworks();
        console.log('response', response);

        const hasETH = response.find(network => network.name === 'ETH');
        if (response.length === 0) {
            setTimeout(() => {
                const updatedPages = pages.map((page, index) => {
                    if (index === 2) {
                        return {
                            ...page,
                            title: "Looks like you don't have your blockchain providers yet.",
                            placeholder: "You'll need to add provider URLs for each chain."
                        };
                    }
                    return page;
                });
                setPages(updatedPages);
                setShowNetworkForm(true);
            }, 2000);
            return;
        }
        if (response.length > 0 && hasETH) {
            setTimeout(() => {
                setCanAdvance(true);
                const updatedPages = pages.map((page, index) => {
                    if (index === 2) {
                        return {
                            ...page,
                            title: "Ready to go!",
                            placeholder: "You're one step closer to liftoff."
                        };
                    }
                    return page;
                });
                setPages(updatedPages);
            }, 2000);

        }
    };

    const page3Check = async () => {
        setCanAdvance(false);
        const response = await getWallet();
        console.log('response', response);
        if (response.publicKey) {
            setTimeout(() => {
                setCanAdvance(true);
                setWallet(response);
                const updatedPages = pages.map((page, index) => {
                    if (index === 3) {
                        return {
                            ...page,
                            title: "Found your wallet.",
                            placeholder: "Make sure its info is correct before going to the next step."
                        };
                    }
                    return page;
                });
                setPages(updatedPages);
            }, 2000);
        } else {

        }
    };

    const page4Check = async () => {
        setCanAdvance(false);
        const response = await checkIfSigner();
        console.log('response', response);
        if (response) {
            setTimeout(() => {
                setCanAdvance(true);
                const updatedPages = pages.map((page, index) => {
                    if (index === 4) {
                        return {
                            ...page,
                            title: "It's time to launch!",
                            placeholder: "Liftoff in 3, 2, 1, ..."
                        };
                    }
                    return page;
                });
                setPages(updatedPages);
                setCanAdvance(true);
            }, 2000);
        } else {
            setTimeout(() => {
                const updatedPages = pages.map((page, index) => {
                    if (index === 4) {
                        return {
                            ...page,
                            title: "You still need top secret clearance.",
                            placeholder: "Follow the instructions below to get your credentials."
                        };
                    }
                    return page;
                });
                setPages(updatedPages);
                setShowSignerForm(true);
            }, 2000);
        }
    };

    const page4Callback = () => {
        // setCanAdvance(true);
        const updatedPages = pages.map((page, index) => {
            if (index === 4) {
                return {
                    ...page,
                    title: "Registering your crendentials.",
                    placeholder: "Elliptfying curves in a digital space..."
                };
            }
            return page;
        });
        setPages(updatedPages);
    };



    const togglePrivateKey = () => {
        setShowPrivateKey(!showPrivateKey);
    };

    const handleCreateValidator = async (e) => {
        e.preventDefault();
        const validator = {
            moniker: document.getElementById('validatorMoniker').value,
            domain: document.getElementById('validatorDomain').value,
            ismine: true,
        };
        console.log('validator', validator);
        const response = await createValidator(validator);
        console.log('response', response);
        if (response) {
            setShowValidatorForm(false);
            setCanAdvance(true);
           
        }
    };

    const handleCreateNetwork = async (networks) => {

        for (const network of networks) { 
          const { chainname, chainid, contractaddress, EVMHttpURL, EVMWssURL } = network;
          console.log('network', network);
          const response = await createNetwork({
            name: chainname,
            chainid: parseInt(chainid),
            contractaddress,
            evmhttpurl: EVMHttpURL,
            evmwssurl: EVMWssURL
          });
          console.log('response', response);
      
          if(!response) {  // if creation fails for a network, exit loop
            alert('Network creation failed!');
            break;
          }
      
          // logic for showNetworkForm and canAdvance
          // assuming they are some state variables of your component
          setShowNetworkForm(networks.indexOf(network) !== networks.length - 1);
          setCanAdvance(networks.indexOf(network) === networks.length - 1);
        }
      };

    const handleNext = () => {
        console.log(canAdvance, currentPage, pages.length - 1)
        if (!canAdvance) { return; }
        setCanAdvance(false);
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1); // Move this line before the pageAPICheck call
            pageAPICheck(currentPage + 1);
            return;
        }

        return onComplete();
    };



    const handleComplete = (pageNum) => {
        console.log('pageNum', pageNum);
        console.log('pages.length', pages.length);
        if (pageNum > pages.length - 1) {
            onComplete();
        }
    };


    return (
        <CSSTransition
            in={!hideOnboarding}
            appear={true}
            timeout={500}
            classNames="slide-fade-down"
            key={currentPage}
            unmountOnExit
        >
            <div className="onboarding-card w-4/5 h-4/5 mx-auto p-10 flex flex-col items-center justify-center shadow-xl rounded-2xl bg-white overflow-auto">
                {currentPage !== 5 && <Page title={pages[currentPage].title} placeholder={pages[currentPage].placeholder} />}

                {showValidatorForm && <ValidatorForm handleCreateValidator={handleCreateValidator} />}

                {currentPage === 2 && showNetworkForm && <NetworkForm handleCreateNetwork={handleCreateNetwork} />}

                {currentPage === 3 && wallet && <WalletInfo wallet={wallet} />}

                {currentPage === 4 && showSignerForm && <NumberedRows onStepCompleted={() => page4Callback()} pubKey={wallet.publicKey} />}

                {currentPage === 5 && <FinalPage />}

                {canAdvance ? <button className="next-button p-2 w-48 mt-8 border-none rounded-xl bg-blue-700 text-white text-lg cursor-pointer hover:scale-105" onClick={handleNext}>
                    Next
                </button> : null}
            </div>
        </CSSTransition>
    );
};

export default OnboardingScreen;