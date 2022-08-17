
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIdGame, deleteDetails } from '../actions';
import { Link } from 'react-router-dom';
import styles from '../styles/GameDetail.module.css'
import { useParams } from "react-router-dom"

import mario from "../assets/mario-dance.gif"



export default function GameDetail() {
    const { id } = useParams()
    //console.log(id)
    const dispatch = useDispatch()
    const detail = useSelector(state => state.detailGame)

    useEffect(() => {
        dispatch(getIdGame(id))

        return () => {
            dispatch(deleteDetails())
        }
    }, [dispatch, id])

    //console.log(detail)

    return (
        <div >


            <Link  className={styles.link} to={'/home'}>Volver al Home</Link>

            {detail.length ?

                <div className={styles.game}>
                    <img className={styles.gameImage} src={detail[0].image} alt='img not found' />
                    <div className={styles.gameInfo} >
                        <h2>{detail[0].name}</h2>
                        <div>
                            {detail[0].genres.map((genero, i) => {
                                return (
                                    <span key={i} >{genero}</span>
                                )
                            })}
                        </div>
                        <p className={styles.description} >
                            {detail[0].description}
                        </p>
                        <p className={styles.info} ><span>Fecha de lanzamiento:</span>{` ${detail[0].released}`}</p>
                        <p className={styles.info} ><span>Rating:</span>{` ${detail[0].rating}`}</p>
                        <div>
                            {detail[0].platforms.map((p, i) => {
                                return (
                                    <span key={i} >{p}</span>
                                )
                            })}
                        </div>
                    </div>


                </div>
                : <img className={styles.mario} src={mario} alt="not found"></img>}
        </div>
    )
}


//   carta detallada:
//   Id -------------------- id:
//   Imagen ---------------- image:
//   Nombre ---------------- name:
//   Géneros --------------  genres:        (en dB esta en la tabla relacional)
//   Descripción ----------  description:
//   Fecha de lanzamiento -- released:
//   Rating ---------------- rating:
//   Plataformas ----------- platforms:
