import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames, deleteGames } from "../actions";

import styles from "../styles/SearchBar.module.css"

import LoaderSearch from './LoaderSearch.jsx'

export default function SearchBar ({handleSearch}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [loader, setLoader] = useState(false)
    function handleInputChange(e) {
        e.preventDefault(e)
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e) {
        setLoader(true)
        e.preventDefault(e)
        if(!name.length){
            alert('Ingrese un nombre')
            setLoader(false)
        }else{
            dispatch(getNameGames(name)).then(() => setLoader(false))
            handleSearch()
            setName("")
        }
    }

    return (
        <div>
            {loader 
                    ? <LoaderSearch/>
                      
                    : <div className={styles.searchbar}>
                            <input className={styles.searchbar__input}
                            type = "text"
                            placeholder= "Buscar juego..."
                            value= {name}
                            onChange = {(e) => handleInputChange(e)}
                            />
                            <button className={styles.searchbar__button} type="submit" onClick={e => handleSubmit(e)}>Buscar</button>
                            
                        </div>
            }
        </div>
    )
}
