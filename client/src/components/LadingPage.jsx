import { Link } from "react-router-dom"
import s from '../styles/LadingPage.module.css'

import palanca from "../assets/videojuego-imagen-animada-0005.gif"
// assets asi llamar a la carpeta de multimedia

export default function LadingPage(){

    return (
        <div className={s.landing}>
            {/* <div className={`${s.landing} ${s.otro}`}>  en esta caso del mismo objeto le paso dos propiedades*/}
            {/* <h1>...Soy LadingPage...</h1> */}
            <h1>Bienvenidos</h1>
            <div className={s.palanca} >
                <Link to="/home">                    
                    <img  src={palanca} alt="not found"></img>
                </Link>
            </div>
        </div>
    )
}