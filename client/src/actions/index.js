import * as types from "../constants/index";
import axios from 'axios';
import os from 'os';
const port = process.env.PORT || 3333;
const url = os.hostname() === "localhost" ? `http://localhost:${port}` : "";
export const addBot = (bot) => {
    return dispatch => {
        dispatch(addBotStarted(bot));
        axios
            .post(`${url}/api/connect`, {

                "user": bot.user,
                "password": bot.password,
            })
            .then(res => {
                console.log(res.data);
                if (res.data.connected === true || res.data.steamguard === true) {
                    dispatch(addBotSuccess(res.data.user));

                } else {
                    console.log('rip')
                    dispatch(addBotError('err'));
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(addBotError(err));
            })

    }
}

export const addBotStarted = (bot) => ({
    type: types.ADD_BOT_STARTED,
    loading: true,
    bot
})
export const addBotSuccess = (bot) => ({
    type: types.ADD_BOT_SUCCESS,
    loading: false,
    bot
})
export const addBotError = (error) => ({
    type: types.ADD_BOT_ERROR,
    loading: false,
    error,
})

export const submitSteamGuard = (bot) => {
    return dispatch => {
        dispatch(submitSteamGuardStarted(bot));
        axios
            .post(`${url}/api/steamguard`, {

                "user": bot.user,
                "steamGuardNeeded": bot.steamGuardNeeded
            })
            .then(res => {
                console.log(res.data);
                if (res.data.connected === true) {
                    dispatch(submitSteamGuardSuccess(res.data.user));

                } else {
                    console.log('rip')
                    dispatch(submitSteamGuardError('err'));
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(submitSteamGuardError(err));
            })

    }
}

export const submitSteamGuardStarted = (bot) => ({
    type: types.STEAMGUARD_BOT_STARTED,
    loading: true,
    bot
})
export const submitSteamGuardSuccess = (bot) => ({
    type: types.STEAMGUARD_BOT_SUCCESS,
    loading: false,
    bot
})
export const submitSteamGuardError = (error) => ({
    type: types.STEAMGUARD_BOT_ERROR,
    loading: false,
    error,
})

export const setBot = (bot) => {
    return dispatch => {
        dispatch(setBotStarted(bot));

        axios
            .post(`${url}/api/configuser`, {
                "user": bot.user,
                "status": bot.status,
                "games": bot.games
            })
            .then(res => {
                dispatch(setBotSuccess(res.data));
            })
            .catch(err => {
                dispatch(setBotError(err));
            })

    }
}
export const setBotStarted = (bot) => ({
    type: types.SET_BOT_STARTED,
    loading: true,
    bot
})
export const setBotSuccess = (bot) => ({
    type: types.SET_BOT_SUCCESS,
    loading: false,
    bot
})
export const setBotError = (error) => ({
    type: types.SET_BOT_ERROR,
    loading: false,
    error,
})


export const getBot = () => {
    return dispatch => {
        dispatch(getBotStarted());

        axios
            .get(`${url}/api/list`)
            .then(res => {
                dispatch(getBotSuccess(res.data.users));
            })
            .catch(err => {
                dispatch(getBotError(err));
            })

    }
}
export const getBotStarted = () => ({
    type: types.GET_BOT_STARTED,
    loading: true,
})
export const getBotSuccess = (bot) => ({
    type: types.GET_BOT_SUCCESS,
    loading: false,
    bot,
})
export const getBotError = (error) => ({
    type: types.GET_BOT_ERROR,
    loading: true,
    error,
})

export const showAddField = () => ({
    type: types.SHOW_ADD_FIELD
})

export const hideAddField = () => ({
    type: types.HIDE_ADD_FIELD
})


export const removeBot = (bot) => {
    return dispatch => {
        dispatch(removeBotStarted(bot));

        axios
            .post(`${url}/api/removebot`, {
                "user": bot.user
            })
            .then(res => {
                dispatch(removeBotSuccess(bot));
            })
            .catch(err => {
                dispatch(removeBotError(err));
            })

    }
}
export const removeBotStarted = (bot) => ({
    type: types.REMOVE_BOT_STARTED,
    loading: true,
    bot
})
export const removeBotSuccess = (bot) => ({
    type: types.REMOVE_BOT_SUCCESS,
    loading: false,
    bot
})
export const removeBotError = (error) => ({
    type: types.REMOVE_BOT_ERROR,
    loading: false,
    error,
})