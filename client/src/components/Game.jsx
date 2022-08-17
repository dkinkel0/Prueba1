import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import notfound from "../assets/game.jpg";
import styles from '../styles/Game.module.css'

export default function Game({ id, image, name, genres }) {

    return (
        <div className={styles.game}>

            <img className={styles.gameImage} src={image ? image : notfound} alt="" />


            <div className={styles.gameInfo} >
                <Link to={`/game/${id}`}>
                    <h2>{name}</h2>
                </Link>
                <div>
                    {genres.map((genero, i) => {
                        return (
                            <span key={i} >{genero}</span>
                        )
                    })}
                </div>
                <div>
                    <p className={styles.gameRating} >Ratin </p>
                </div>
            </div>
        </div>
    )
}
