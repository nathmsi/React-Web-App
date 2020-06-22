import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function PositionedSnackbar(props) {

    const {
        open,
        message,
        success,
        handleClose
    } = props;




    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            autoHideDuration={2000}
        >
            <Alert onClose={handleClose} severity={success ? 'success' : 'error'}>
                {message}
            </Alert>
        </Snackbar>
    );
}
