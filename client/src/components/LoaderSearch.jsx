import React from 'react';
import styles from "../styles/SearchBar.module.css"
import mario from "../assets/mario-dance.gif"

export default function Loading() {

    return (
        <div className={styles.mario} >
            <img  src={mario} alt="not found" />
        </div>
    )
}
