
const initialState = {
    
    allVideoGame: [],
    videoGames: [],
    detailGame: [],
    genres: [],
    platforms: [],
    estado: ""
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_ALL_GAMES':
            return {
                ...state,
                allVideoGame: action.payload,
                videoGames: action.payload
            }
        case 'GET_NAME_GAMES':
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
        //--FILTROS -------------
        case 'FILTER_GENRES':
            return {
                ...state,
                videoGames: state.allVideoGame.filter(g => g.genres.includes(action.payload))
            }
        case 'FILTER_CREATED':
            if(action.payload == 'api'){
                return {
                    ...state,
                    videoGames: state.allVideoGame.filter(g => !isNaN(g.id))
                }
            } 
            if(action.payload == 'created'){
                return {
                    ...state,
                    videoGames: state.allVideoGame.filter(g => isNaN(g.id))
                }
            } 
            
        //----------------------
        default:
            return state
    }
}

//   carta basica API:
//   Id -------------------- id: 
//   Imagen ---------------- image:    
//   Nombre ---------------- name:      
//   Géneros --------------  genres: []     (en dB esta en la tabla relacional)
//   Plataformas ----------- platforms: []