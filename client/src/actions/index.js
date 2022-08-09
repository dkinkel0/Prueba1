import axios from 'axios';

export function getAllOneGames(name) {
    if (name) {
        return async function (dispatch) {
            let json = await axios.get(`/videogames?name=${name}`);
            return dispatch({
                type: 'GET_ALL_ONE_GAMES',
                payload: json.data
            })
        }
    } else {
        return async function (dispatch) {
            let json = await axios.get(`/videogames`);
            return dispatch({
                type: 'GET_ALL_ONE_GAMES',
                payload: json.data
            })
        }
    }
}

export function getIdGame(id) {

    return async function (dispatch) {
        let json = await axios.get(`/videogame/${id}`);
        return dispatch({
            type: 'GET_ID_GAME',
            payload: json.data
        })
    }
}

export function getGenres() {

    return async function (dispatch) {
        let json = await axios.get(`/genres`);
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function getPlatforms() {

    return async function (dispatch) {
        let json = await axios.get(`/platforms`);
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
}

export function createGame(input) {
   
    return async function (dispatch) {
        let json = await axios.post('/videogames', input);
        return dispatch({
            type: 'CREATE_GAME',
            payload: json.data
        })
    }
}

export function deleteGames() {
    return {
        type: 'DELETE_GAMES',
    }
}

export function deleteDetails() {
    return {
        type: 'DELETE_DETAILS',
    }
}



