import {useEffect, useState, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllOneGames, deleteGames} from '../actions'
import mario from "../assets/mario-dance.gif"
import { Link } from 'react-router-dom'

import styles from './Home.module.css'

import SearchBar from './SearchBar'
import Paginado from './Paginado.jsx'
import Game from "./Game.jsx"

export default function Home(){
    //esto se usa para no usar el connect, ni hacer mapStateToProps ni mapDispatchToProps
    const dispatch = useDispatch()  // la constante es dispatch es la ejecucion del useDispatch

    const games = useSelector((state) => state.videoGames) // accedo a la parte del estado q quiero
    //  countriesFiltered                                                // la constante countriesRedux se trae
                                                                         // la parte del esado que quiero de mi estado de redux
    const [currentPage, setCurrentPage] = useState(1) // pagina actual
    const [gamesPerPage] = useState(15)   // cantidad de juegos por pagina
    const indexOfLastGame = currentPage * gamesPerPage  // indice del ultimo game
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // indice del primer game
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame) // corto el arrelgo a los juegos que voy a mostrar por pagina
    
    useEffect(() => {
        dispatch(getAllOneGames())
    }, [dispatch])
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(deleteGames())
        dispatch(getAllOneGames())
    }

    return (
        <div>
            {/* <h1>...Soy en Home...</h1> */}
            <SearchBar/>
            <br></br>
            <div>
                <button onClick={e => handleClick(e)}>CARGAR NUEVAMENTE</button>
            </div>
            <br></br>
            <Link to='/addgame'>
                <button>CREAR JUEGO</button>
            </Link>
            
            <Paginado gamesPerPage = {gamesPerPage} N_games={games.length} paginado={paginado}/>
            <div className={styles.gamesGrid}>
                {currentGames.length ? currentGames.map(c => {
                    return (
                        <Fragment key={c.id}>
                            <Game  id={c.id} image={c.image} name={c.name} genres={c.genres}  />     
                        </Fragment>
                    )
                }) : <img className={styles.imageLoading} src={mario} alt="not found"/>}
            </div>    
        </div>
    )
}
