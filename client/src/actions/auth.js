import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        console.log(data);
        dispatch({ type: "AUTH", data });
        localStorage.setItem('Profile', JSON.stringify(data.user)); // Store user data in local storage
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/');
    } catch (err) {
        console.log("Error for login", err);
    }
};

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: "AUTH", data });
        localStorage.setItem('Profile', JSON.stringify(data.user)); // Store user data in local storage
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/');
    } catch (err) {
        console.log("Error for signup", err);
    }
};
