import { useState } from 'react';
import yelp from '../api/yelp';


export default () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const createNewOrder = async (objContact) => {
        try {
            setLoading(true);
            setErrorMessage('');
            const response = await yelp.post('/orders/', {
                ...objContact
            });
            setSuccess(true);
            console.log(response.data);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMessage('error was found !!');
        }
    }

    return {
        createNewOrder,
        loading,
        errorMessage,
        success
    };
}


