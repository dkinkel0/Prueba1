import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, deleteGames, getGenres, filterGenres, filterCreated, filterOrder } from '../actions'
import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.css'



import SearchBar from './SearchBar'
import Paginado from './Paginado.jsx'
import Videogames from './Videogames.jsx'
import Filtros from './Filtros.jsx'


export default function Home() {
    //esto se usa para no usar el connect, ni hacer mapStateToProps ni mapDispatchToProps
    const dispatch = useDispatch()  // la constante es dispatch es la ejecucion del useDispatch

    const games = useSelector((state) => state.videoGames) // accedo a la parte del estado q quiero


    const [bandera, setBandera] = useState(true) // ordenamiento

    const [habgen, setHabgen] = useState(false) // renderizado condicionado de filtro
    const [habsrc, setHabsrc] = useState(false) // renderizado condicionado de filtro

    const [currentPage, setCurrentPage] = useState(1) // pagina actual
    const [gamesPerPage] = useState(15)   // cantidad de juegos por pagina
    const indexOfLastGame = currentPage * gamesPerPage  // indice del ultimo game
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // indice del primer game
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame) // corto el arrelgo a los juegos que voy a mostrar por pagina

    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleClick = (e) => {
        e.preventDefault()
        window.location.reload()
        
    }

    const handleSearch = () => {
        setCurrentPage(1)
    }

    //-- Filtros ----------------------------------
    const handleGenres = (e) => {
        e.preventDefault()
        if (e.target.value !== 'select') {
            dispatch(filterGenres(e.target.value))
            setCurrentPage(1)

        }
    }
    const handleCreated = (e) => {
        e.preventDefault()
        if (e.target.value !== 'select') {
            dispatch(filterCreated(e.target.value))
            setCurrentPage(1)

        }
    }

    const handleSelect = (e) => {
        e.preventDefault()
        if (e.target.value !== 'select') {
            if (e.target.value === 'genero') {
                setHabgen(true)
                setHabsrc(false)
            } else {
                setHabsrc(true)
                setHabgen(false)
            }
        }
    }

    const handleOrder = (e) => {
        e.preventDefault()
        if (e.target.value !== 'select') {
            dispatch(filterOrder(e.target.value))
            setCurrentPage(1)
            setBandera(!bandera)
        }
    }

    return (
        <div className={styles.home}>
            <div className={styles.barra}>

                <SearchBar handleSearch={handleSearch}/>

                <div>
                    <button className={styles.btn1} onClick={e => handleClick(e)}>CARGAR NUEVAMENTE</button>
                </div>
               
                <Link className={styles.btn2} to='/addgame'>
                    CREAR JUEGO
                </Link>
                
            </div>

            <br></br>
            <Filtros
                handleSelect={handleSelect}
                handleGenres={handleGenres}
                handleCreated={handleCreated}
                handleOrder={handleOrder}
                habgen={habgen}
                habsrc={habsrc}
            />


            <Paginado gamesPerPage={gamesPerPage} N_games={games.length} paginado={paginado} />
            <Videogames currentGames={currentGames} />

        </div>
    )
}
