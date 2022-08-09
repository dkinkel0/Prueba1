
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIdGame, deleteDetails } from '../actions';
import { Link } from 'react-router-dom';

import { useParams } from "react-router-dom"

import mario from "../assets/mario-dance.gif"


export default function GameDetail() {
    const { id } = useParams()
    console.log(id)
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
        <div>
            <h3>Soy GameDeatil</h3>
            <Link to={'/home'}>Volver al Home</Link>
            
            {detail.length ?
                
                <div>
                    <img src={detail[0].image} alt='img not found' width='160px' height='100px' />
                    <h2>{detail[0].name}</h2>
                    {detail[0].genres.map((genero, i) => {
                        return (
                            <Fragment key={i}>
                                <p>{genero}</p>
                            </Fragment>
                        )
                    })}
                    {detail[0].description}
                    <p><span>Fecha de lanzamiento:</span>{` ${detail[0].released}`}</p>
                    <p><span>Rating:</span>{` ${detail[0].rating}`}</p>
                    {detail[0].platforms.map((p, i) => {
                        return (
                            <Fragment key={i}>
                                <p>{p}</p>
                            </Fragment>
                        )
                    })}
                    
                    
                </div>
                : <img src={mario} alt="not found"></img>}
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
