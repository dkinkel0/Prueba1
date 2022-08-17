import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from '../actions'

import styles from '../styles/Filtros.module.css'



export default function Filtros({ handleSelect, handleGenres, handleCreated, handleOrder, habgen, habsrc }) {

    const dispatch = useDispatch()
    const generos = useSelector((state) => state.genres)

    useEffect(() => {

        dispatch(getGenres())
    }, [dispatch])

    return (
        <div className={styles.filters}>
            
            <div>
                <label className={styles.filters__label} >FILTRAR POR:</label>
                <select onChange={(e) => handleSelect(e)}>
                    <option value='select' hidden >Elegir...</option>
                    <option value='genero'>Genero</option>
                    <option value='by'>Existes o creados</option>
                </select>
            </div>
            
            <div>
                {habgen && <select onChange={(e) => handleGenres(e)}>
                    <option value="select" hidden>Seleccionar...</option>
                    <option value="all">All</option>
                    {generos?.map((g, i) =>
                        <option value={g.name} key={i}>{g.name}</option>
                    )}
                </select>
                }
                {habsrc && <select onChange={(e) => handleCreated(e)}>
                    <option value="select" hidden>Seleccionar...</option>
                    <option value="all">All</option>
                    <option value="api">Existentes</option>
                    <option value="created">Agregados</option>
                </select>
                }
            </div>

            <div>
                <label className={styles.filters__label} >ORDENAR POR:</label>
                <select onChange={(e) => handleOrder(e)}>
                    <option value="select" hidden>Seleccionar...</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                    <option value="asc">Rating ASC</option>
                    <option value="des">Rating DES</option>
                </select>
            </div>

        </div>
    )
}
