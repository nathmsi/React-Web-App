import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function PositionedSnackbar(props) {

    const {
        open,
        message,
        success,
        handleClose,
        positon,
        duration
    } = props;


    return (
        <Snackbar
            anchorOrigin={positon}
            open={open}
            onClose={handleClose}
            autoHideDuration={2000}
            message={message ? message : undefined}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            }
        />
    );
}
