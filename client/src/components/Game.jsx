import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import notfound from "../assets/game.jpg";

export default function Game({id, image, name, genres}){

    return (
        <div>               
            <img  src={image ? image : notfound} alt= "image not found" width='160px' height='100px' />
            <Link to={`/game/${id}`}>
                <h2>{name}</h2>
            </Link>
            {genres.map((genero, i) => {
                return (
                    <Fragment key={i}>
                       <p>{genero}</p> 
                    </Fragment>
                )
            })}
        </div>
    )
}
