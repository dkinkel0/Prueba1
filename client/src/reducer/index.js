
const initialState = {
    
    videoGames: [],
    detailGame: [],
    genres: [],
    platforms: [],
    estado: ""
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_ALL_ONE_GAMES':
            return {
                ...state,
                videoGames: action.payload
            }
        case 'GET_ID_GAME':
            return {
                ...state,
                detailGame: [action.payload]
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }
        case 'CREATE_GAME':
            return {
                ...state,
                estado: action.payload
            }
        case 'DELETE_GAMES':
            return {
                ...state,
                videoGames: []
            }
        case 'DELETE_DETAILS':
            return {
                ...state,
                detailGame: []
            }
        default:
            return state
    }
}
