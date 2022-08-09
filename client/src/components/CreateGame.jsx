import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createGame, getGenres, getPlatforms } from '../actions'
import { useDispatch, useSelector } from "react-redux";

import { validate } from "../util/index.js"

//   carta detallada:
//   Id -------------------- id:
//   Imagen ---------------- image:    X
//   Nombre ---------------- name:     X 
//   Géneros --------------  genres:   X   (en dB esta en la tabla relacional)
//   Descripción ----------  description:  X
//   Fecha de lanzamiento -- released: X
//   Rating ---------------- rating: X 
//   Plataformas ----------- platforms: X

export default function CreateActivity() {
    const dispatch = useDispatch()
    const generos = useSelector((state => state.genres))
    const platforms = useSelector((state => state.platforms))
    //const history = useHistory()
    
    const [input, setInput] = useState({
        image: "",
        name: "",
        genres: [],
        description: "",
        released: "",
        rating: "",
        platforms: []
    })

    const [genresIn, setGenresIn] = useState([])
    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    function handleSubmit(e) {
        e.preventDefault();
        if(!input.name || !input.genres.length || !input.platforms.length || !input.description || !input.released || !input.rating){
            alert('Flatan completar campos')
        }
       
        dispatch(createGame(input));
        alert('Juego creado');
        // Para volver a la pantalla principal
        //history.push('/home')
        // Reseteamos el input
    }

    function handleChange(e) { // name, image, description, released
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        //console.log(input)
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    function handleSelectPlataform(e) {
        
        if (!input.platforms.includes(e.target.value) && e.target.value !== 'select') {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            setError(validate({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
        }
        
    }

    function handleSelectGenres(e) {
        
        if (!genresIn.includes(e.target.value) && e.target.value !== 'select') {
            setGenresIn(
                [...genresIn, e.target.value]  // [action, shoter]
            )
            setInput({
                ...input,
                genres: [...input.genres, generos.find(g => g.name === e.target.value).id]
            })
            setError(validate({
                ...input,
                genres: [...input.genres, generos.find(g => g.name === e.target.value).id]
            }))
        }
    }


    const handleCheck = (e) => { // rating
        if(e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleDeleteGenres(genre) {
        setGenresIn(
            genresIn.filter(el => el !== genre)
        )
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== generos.find(g => g.name === genre).id) 
        })
        setError(validate({
            ...input,
            genres: input.genres.filter(g => g !== generos.find(g => g.name === genre).id)
        }))
    }

    function deltePlatforms(platform) {
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !== platform)
        })
        setError(validate({
            ...input,
            platforms: input.platforms.filter(p => p !== platform)
        }))

    }

    return (
        <div>
            <br></br>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <br></br>
            <br></br>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label>Nombre:   </label>
                    <input type='text' value={input.name} name='name' autoComplete = 'off' onChange={e => handleChange(e)} />
                    {error.name && <span>  {error.name}</span>}
                </div>
                <br></br>


                <div>
                    <label>Imagen:   </label>
                    <input type='text' placeholder="Opcional..." value={input.image} name='image' onChange={e => handleChange(e)} />
                    {error.image && <span>  {error.image}</span>}
                </div>
                <br></br>

                <div>
                    <label>Genero:   </label>
                    <div>
                        <select onChange={(e) => handleSelectGenres(e)} >
                                <option value="select">Seleccionar...</option>
                            {generos.map((genre, i) => (
                                <option value={genre.name} key={i}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                    {error.genres && <span>  {error.genres}</span>}
                </div>
                <br></br>
                {genresIn.map((genre, i) =>
                    <p key={i}>
                        {genre}
                        <button type='button' onClick={() => handleDeleteGenres(genre)}>X</button>
                    </p>

                )}
                <br></br>
                
                <div>
                    <label>Descripción:   </label>
                    <input type='text' placeholder="Hasta 3mil caracteres" value={input.description} name='description' onChange={e => handleChange(e)} />
                    {error.description && <span>  {error.description}</span>}
                </div>
                <br></br>

                <div>
                    <label>Fecha de lanzamiento: </label>
                    <input
                        type='date'
                        name="released"
                        value={input.released}
                        onChange={(e) => handleChange(e)}
                    />
                    {error.released && <span>  {error.released}</span>} 
                </div>
                <br></br>

                <div>
                    <label>Rating: </label>
                    <label>
                            <input type="radio" value='1' name='rating' onChange={(e) => handleCheck(e)} />
                        1</label>
                    <label>
                            <input type="radio" value='2' name='rating' onChange={(e) => handleCheck(e)} />
                        2</label>
                    <label>
                            <input type="radio" value='3' name='rating' onChange={(e) => handleCheck(e)} />
                        3</label>
                    <label>
                            <input type="radio" value='4' name='rating' onChange={(e) => handleCheck(e)} />
                        4</label>    
                    <label>
                            <input type="radio" value='5' name='rating' onChange={(e) => handleCheck(e)} />
                        5</label>  
                    {error.rating && <span>  {error.rating}</span>}      
                </div>
                <br></br>

                <div>
                    <label>Plataformas:    </label>
                    <div>
                        <select onChange={e => handleSelectPlataform(e)}>
                                <option value='select'>Seleccionar...</option>
                            {platforms.map((p, i) => (
                                <option value={p} key={i}>{p}</option>
                            ))}    
                        </select>
                    </div>
                    {error.platforms && <span>  {error.platforms}</span>}
                </div>
                <br></br>
                {input.platforms.map((p,i) => 
                    <p key={i}>{p}
                        <button onClick={() => deltePlatforms(p) }>X</button>
                    </p>
                )}

                <div>
                    <button type='submit' >Crear actividad</button>
                </div>

            </form>
        </div>
    )
}


//disable --- true -- se apaga

// Object.keys(error).length 