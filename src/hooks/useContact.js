import { useState } from 'react';
import yelp from '../api/yelp';


export default () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const createNewContact = async (objContact) => {
        try {
            setLoading(true);
            setErrorMessage('');
            const response = await yelp.post('/contacts/', {
                ...objContact
            });
            console.log(response.data);
            setSuccess(true);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMessage('error was found !!');
        }
    }

    return {
        createNewContact,
        loading,
        errorMessage,
        success
    };
}


