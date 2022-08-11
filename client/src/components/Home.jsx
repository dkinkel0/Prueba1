import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, deleteGames, getGenres, filterGenres, filterCreated } from '../actions'
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
    const generos = useSelector((state) => state.genres)
    
    const [bandera, setBandera] = useState("")

    const [currentPage, setCurrentPage] = useState(1) // pagina actual
    const [gamesPerPage] = useState(15)   // cantidad de juegos por pagina
    const indexOfLastGame = currentPage * gamesPerPage  // indice del ultimo game
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // indice del primer game
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame) // corto el arrelgo a los juegos que voy a mostrar por pagina
    
    useEffect(() => {
        dispatch(getAllGames())
        dispatch(getGenres())
    }, [dispatch])
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(deleteGames())
        dispatch(getAllGames())
    }

    const handleGenres = (e) => {
        e.preventDefault()
        if(e.target.value !== 'select'){
            dispatch(filterGenres(e.target.value))
            setCurrentPage(1)
            setBandera(e.target.value)
        }
    }
    const handleCreated = (e) => {
        e.preventDefault()
        if(e.target.value !== 'select'){
            dispatch(filterCreated(e.target.value))
            setCurrentPage(1)
            setBandera(e.target.value)
        }
    }

    // [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
    // [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating

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
            <br></br>
            <br></br>

            <div>Filtrar por:</div>
            <div>
                <label>Genero:   </label>
                <select  defaultValue={"select"} onChange={ (e) => handleGenres(e) }>
                            {/* <option selected disabled hidden>Seleccionar...</option> */}
                            <option value="select">Seleccionar...</option>
                    {generos?.map((g, i) => 
                            <option value={g.name} key={i}>{g.name}</option>
                        )}

                </select>
            </div>
            <div>
                <label>Api o creados:   </label>
                <select onChange={ (e) => handleCreated(e) }>
                            <option value="select">Seleccionar...</option>
                            {/* <option selected disabled hidden>Seleccionar...</option> */}
                            <option value="api">API</option>
                            <option value="created">Creado</option>
                </select>
            </div>
            <br></br>

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
