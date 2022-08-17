import axios from 'axios';

export function getAllGames() {

    return async function (dispatch) {
        let json = await axios.get('/videogames');
        return dispatch({
            type: 'GET_ALL_GAMES',
            payload: json.data
        })
    }
}

export function getNameGames(name) {

    return async function (dispatch) {
        try {
            let json = await axios.get(`/videogames?name=${name}`);
            console.log(json.data)
            return dispatch({
                type: 'GET_NAME_GAMES',
                payload: json.data
            })

        } catch (error) {
            console.log(error)
            return dispatch({
                type: 'GET_NAME_GAMES',
                payload: []
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
        try {
            if (input.image.length) {
                let json = await axios.post('/videogames', input);
                return dispatch({
                    type: 'CREATE_GAME',
                    payload: json.data
                })
            } else {
                let not_image = {
                    name: input.name,
                    genres: input.genres,
                    description: input.description,
                    released: input.released,
                    rating: input.rating,
                    platforms: input.platforms
                }
                let json = await axios.post('/videogames', not_image);
                return dispatch({
                    type: 'CREATE_GAME',
                    payload: json.data
                })
            }
            
        } catch (error) {
            console.log(error)
        }

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

// filtros

export function filterGenres(genero) {
    return {
        type: 'FILTER_GENRES',
        payload: genero
    }
}

export function filterCreated(by) {
    return {
        type: 'FILTER_CREATED',
        payload: by
    }
}

export function filterAlphabet(order) {
    return {
        type: 'FILTER_ALPHABET',
        payload: order
    }
}

export function filterRating(rating) {
    return {
        type: 'FILTER_RATING',
        payload: rating
    }
}

export function filterOrder(order) {
    if (order === 'az' || order === 'za') {
        return {
            type: 'FILTER_ALPHABET',
            payload: order
        }
    } else {
        return {
            type: 'FILTER_RATING',
            payload: order
        }
    }
}





