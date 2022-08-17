import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames } from '../actions'
import styles from '../styles/Videogames.module.css';

import Game from "./Game.jsx"
import Loading from "./Loading.jsx"
import NotFound from './NotFound'

export default function Videogames({ currentGames }) {

    // const games = useSelector((state) => state.videoGames)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getAllGames()).then(() => setLoading(false))
        //dispatch(getAllGames())
    }, [ dispatch])

    if(loading) {
        return (<Loading/>)
    }


    return (
        /* loading ? <Loading/> :  */
        <div className={styles.gamesGrid}>
            {currentGames.length ? currentGames.map(c => {
                return (
                    <Fragment key={c.id}>
                        <Game id={c.id} image={c.image} name={c.name} genres={c.genres} />
                    </Fragment>
                )
            }) : <NotFound/>}
        </div>
    )

}
// <NotFound/>
