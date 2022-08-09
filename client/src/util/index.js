//   carta detallada:
//   Id -------------------- id:
//   Imagen ---------------- image:    X
//   Nombre ---------------- name:     X 
//   Géneros --------------  genres:   X   (en dB esta en la tabla relacional)
//   Descripción ----------  description:  X
//   Fecha de lanzamiento -- released: X
//   Rating ---------------- rating: X 
//   Plataformas ----------- platforms: X

export const validate = (input) => {
    
    const error = {}

    //-- Nombre --------------------------------------------------------------------------------
    if(!input.name){       
         error.name = 'Tiene que ingresar el nombre'
    }else if (!/^[a-z]{1}/i.test(input.name)){
        error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
    }else if (/^[a-z](\d|\W|\s){1}/i.test(input.name)){
        error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
    }else if (/^[a-z][a-z](\d|\W|\s){1}/i.test(input.name)){
        error.name = 'Los primeros 3 caracteres del nombre no puede ser espacios en blanco, digitos o caracteres especiales'
    }else if(input.name.trim().length < 3 ){
        error.name = 'EL nombre debe contener al menos 3 letras'
    }
    //-- Imagen -------------------------------------------------------------------------------
    if (/[^h]/.test(input.image)) {
        if(!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.image)){
            error.image = "Url invalida"
        }
    }
    //-- Genereno ------------------------------------------------------------------------------
    if(!input.genres.length){
        error.genres = 'Debe elegir al menos un Genero'
    }
    //-- Plataformas ------------------------------------------------------------------------------
    if(!input.platforms.length){
        error.platforms = 'Debe elegir al menos una Plataforma'
    }
    //-- Descripcion ------------------------------------------------------------------------------
    if(!input.description.length){
        error.description = 'Debes ingresar una descripcion'
    }else if(input.description.length > 3000){
        let borrar = input.description.length - 3000;
        error.description = `Descripcion muy larga, borre ${borrar} caracteres`
    }
    //-- Fecha de lanzamiento --------------------------------------------------------------------
    const fechaTotal = input.released.split('-')
    const dia = parseInt(fechaTotal[2])
    const mes = parseInt(fechaTotal[1])
    const anio = parseInt(fechaTotal[0])

    const today = new Date()
    const currentD = today.getDate()
    const currentM = today.getMonth() + 1
    const currentA = today.getFullYear()

    if(!input.released){
        error.released = 'Debes ingresar una fecha de lanzamiento'
    }else if(anio < currentA){
        error.released = 'No puede ser menor que año en curso'
    } else if(anio == currentA && mes < currentM){
        error.released = 'No puede ser menor que el mes en curso'
    } else if(anio == currentA && mes == currentM && dia < currentD){
        error.released = 'No puede ser menor que el dia en curso'
    }
    
    //-- Rating -------------------------------------------------------------------
    if(!input.rating){
        error.rating = 'Debe ingresar un rating' 
    }

    return error
}



