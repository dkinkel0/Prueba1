import React from "react";
import styles from '../styles/Paginado.module.css'


export default function Paginado({ gamesPerPage, N_games, paginado }) {
    const pageNumbers = []
    //                             100           15        = 6,6     --> 7
    for (let i = 1; i <= Math.ceil(N_games / gamesPerPage); i++) {
    //for (let i = 1; i <= 7; i++) {
    // 7                                                 
        pageNumbers.push(i);   // 7 posiciones
    }
    // pageNumbers -->  [1, 2 , 3, 4, 5, 6, 7]

    return (
        
            

        < nav className = { styles.pageNumbers } >
           
            <ul className={styles.paginado}>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className={styles.numbers} key={number}>
                            <button onClick={() => paginado(number)} className={styles.number}>{number}</button>
                        </li>
                    ))
                }

            </ul>

        </nav >
        
    )
}