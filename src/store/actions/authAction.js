import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


import yelp from '../../api/yelp';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_OUT,
    MENU_CATEGORIES
} from './types'


const FIREBASE_CONFIG = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGESENDERID,
    appId: process.env.REACT_APP_APPID,
}


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}


export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}




export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });
            firebase.auth().signInWithEmailAndPassword(email.replace(/\s/g, ''), password)
            .then(async (user) => {
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: user.user
                });
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_USER_FAIL,
                    payload: err.toString()
                });
            })
    }
}



export const loginOut = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(async () => {
                dispatch({
                    type: LOGIN_OUT,
                    payload: 'text'
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}


export const tryLocalSignin = () => {
    return async (dispatch) => {

        try {
            dispatch({
                type: LOGIN_USER
            });

            firebase.initializeApp(FIREBASE_CONFIG);

            firebase.auth().onAuthStateChanged(
                async (user) => {
                    if (user) {
                        console.log(`%c ${user.email} connected`, "color:orange");
                        firebase.auth().currentUser.getIdToken(true).then(
                            async (token) => {
                                dispatch({
                                    type: LOGIN_USER_SUCCESS,
                                    payload: {
                                        user,
                                        token
                                    }
                                });

                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                    } else {
                        dispatch({
                            type: LOGIN_USER_FAIL,
                            payload: ''
                        });
                        console.log(`%c not user connected`, "color:orange");
                    }
                },
                (error) => {
                    dispatch({
                        type: LOGIN_USER_FAIL,
                        payload: ''
                    });
                    console.log(error);
                }
            )
        }
        catch (error) {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: ''
            });
            console.log(error);
        }

    }
}


// load seach product list

const loadListSearchProduct = () => {
    return new Promise(
        (resolve, reject) => {
            yelp.get('/menu/products-search')
                .then(
                    (response) => {
                        const dataR = response.data ? response.data : [];
                        resolve(dataR);
                    }
                )
                .catch(error => {
                    resolve([]);
                    console.log(error);
                })
        }
    )
}



const getMainMenus = (dispatch) => {
    try{
        
            firebase.database().ref('/products-menu')
                .on('value',
                    (data) => {
                        const dataR = data.val() ? data.val() : [];
                        console.log(dataR);
                        dispatch({
                            type: MENU_CATEGORIES,
                            payload:  dataR
                        })
                    },
                    (error) => {
                        console.log(error);
                    }
                )
    }catch(err){
        console.log(err);
    }
}