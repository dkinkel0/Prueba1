import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames, deleteGames } from "../actions";

import styles from "../styles/SearchBar.module.css"

export default function SearchBar ({handleSearch}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault(e)
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        //dispatch(deleteGames())
        dispatch(getNameGames(name))
        handleSearch()
        setName("")
       
    }

    return (
        <div className={styles.searchbar}>
            <input className={styles.searchbar__input}
            type = "text"
            placeholder= "Buscar juego..."
            value= {name}
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={styles.searchbar__button} type="submit" onClick={e => handleSubmit(e)}>Buscar</button>
            
        </div>
    )
}