import axios from 'axios';

// const serverDomain = process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:7044';
//use window.location.origin to get the current domain
const serverDomain = 'http://localhost:7044';

export const getMyValidator = async () => {
  try {
    const response = await axios.get(`${serverDomain}/validator/`);
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching validator data:', error);
    return null;
  }
};

export const createValidator = async (validator) => {
    try {
        const response = await axios.post(`${serverDomain}/validator/params`, validator);
        return response.data;
    } catch (error) {
        console.error('Error creating validator:', error);
        return null;
    }
};

export const createNetwork = async (network) => {
    try {
        const response = await axios.post(`${serverDomain}/network`, network);
        return response.data;
    } catch (error) {
        console.error('Error creating network:', error);
        return null;
    }
}

export const getWallet = async () => {
    try {
        const response = await axios.get(`${serverDomain}/status`);
        return response.data;
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        return null;
    }
};

export const getNetworks = async () => {
    try {
        const response = await axios.get(`${serverDomain}/network`);
        console.log('response', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching network data:', error);
        return null;
    }
};

export const checkIfSigner = async () => {
    try {
        const response = await axios.get(`${serverDomain}/signer`);
        return response.data;
    } catch (error) {
        console.error('Error checking if signer:', error);
        return null;
    }
};
