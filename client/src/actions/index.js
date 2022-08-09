import axios from 'axios';

export function getAllOneGames(name) {
    if (name) {
        return async function (dispatch) {
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            return dispatch({
                type: 'GET_ALL_ONE_GAMES',
                payload: json.data
            })
        }
    } else {
        return async function (dispatch) {
            let json = await axios.get(`http://localhost:3001/videogames`);
            return dispatch({
                type: 'GET_ALL_ONE_GAMES',
                payload: json.data
            })
        }
    }
}

export function getIdGame(id) {

    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/videogame/${id}`);
        return dispatch({
            type: 'GET_ID_GAME',
            payload: json.data
        })
    }
}

export function getGenres() {

    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/genres`);
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function getPlatforms() {

    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/platforms`);
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
}

export function createGame(input) {
   
    return async function (dispatch) {
        let json = await axios.post('http://localhost:3001/videogames', input);
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



