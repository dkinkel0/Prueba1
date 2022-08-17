const { Router } = require('express');
const axios = require ('axios')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//   carta detallada:
//   Id -------------------- id:         
//   Imagen ---------------- image:
//   Nombre ---------------- name:
//   Géneros --------------  genres:        (en dB esta en la tabla relacional)
//   Descripción ----------  description:
//   Fecha de lanzamiento -- released:
//   Rating ---------------- rating:
//   Plataformas ----------- platforms:

const getApiInfo = async () => {
    
    try {
        let gamesApi = [];
        for (let i = 1; i <=1; i++) {
            
            let juegos = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
            gamesApi = [...gamesApi, ...juegos.data.results]
        }
    
        let games = gamesApi?.map(juego => { 
            //console.log(juego)
            return {
                id: juego.id,
                image: juego.background_image,
                name: juego.name,
                genres: juego.genres.map(g => g.name),
                // description: 'Not description',
                // released: juego.released,
                rating: juego.rating,
                platforms: juego.platforms.map(ob => ob.platform.name) 
                  
            }
        })
    
        return games
        
    } catch (error) {
        return error.message
    }
}

const getdbInfo = async () => {
    try {
        let gamesdB = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            },
        })
        const games = await gamesdB.map(game => {
            return {
                id: game.id,
                image: game.image,
                name: game.name,
                // ...game,
                genres: game.genres.map(el => el.name),
                // description: game.description,
                // released: game.released,
                rating: game.rating,
                // platforms: game.platforms   
            }
        })
        //console.log(games)
        return games
        
    } catch (error) {
        return error.message
    }
    
}

const getAllApiDbInfo = () => {

    const allInfo = Promise.all([getApiInfo(), getdbInfo()])
    .then(result => { 
        return [...result[0], ...result[1]]})
    return allInfo    
    .catch(error => {return error.message});
}

//-- Funciones de Generos -------------------------------------------------------------------------------------

const getGenresApi = async () => {
    try {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        //console.log(genresApi)
        const genres = genresApi.data.results.map(g => {
            return {
                id: g.id,
                name: g.name
            }
        })
    
        return genres;

    } catch (error) {
        return error.message
    }
}

const addAllGenres = async () => {
    const genres = await getGenresApi()
    genres.forEach(g =>{
        Genre.findOrCreate({
            where: {
                id: g.id,
                name: g.name
            }
        })
    })
}

//-------- ROUTES -----------------------------------------------------------------------

//-- MOSTRAR JUEGOS Me traigo los juegos de la API y de la DB
router.get('/videogames', async (req, res) => {
    try {
        const { name } = req.query;
        //console.log(name)
        const games = await getAllApiDbInfo()
        if(name){
            const gamesName = games.filter(g => g.name.toLowerCase().includes(name.toLowerCase())).slice(0,15)
            gamesName.length ? res.status(200).json(gamesName) : res.status(404).json({error: 'Not found'})
        }else{
            res.status(200).json(games)
        }

    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

//-- Busqueda por ID ------------------------------------------------------------------
router.get('/videogame/:idVideogame', async (req, res) => {

    const {idVideogame} = req.params;
    try {
        
        if (isNaN(idVideogame)) {  // esto da true si es un uuid, en realidad mira si no es un numero
            const game = await Videogame.findOne({
                where: {
                    id: idVideogame           // si el id es igual al que me pasan por params
                },
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                },
            })
            const juego =  {
                            id: game.id,
                            image: game.image,
                            name: game.name,
                            // ...game,
                            genres: game.genres.map(el => el.name),
                            description: game.description,
                            released: game.released,
                            rating: game.rating,
                            platforms: game.platforms   
                          }
            
    
             Object.keys(juego).length ? res.status(200).json(juego) : res.status(404).send('Not Found')
        }else{
            //console.log("aca estoy")
            const juego = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
            
            const game = {
                id: juego.data.id,
                image: juego.data.background_image,
                name: juego.data.name,
                genres: juego.data.genres.map(g => g.name),
                description: juego.data.description_raw,
                released: juego.data.released,
                rating: juego.data.rating,
                platforms: juego.data.platforms.map(ob => ob.platform.name)              
            }
            
            Object.keys(game).length ? res.status(200).json(game) : res.status(404).send('Not Found')
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

//--POST Agregar juego a la DB
router.post('/videogames', async (req, res) => {
        console.log(req.body)
    try {
        const {image, name, genres, description, released, rating, platforms} = req.body;
        const [newGame, estado] = await Videogame.findOrCreate({
            where: {                               // el where son los valores por los cuales quiero encontrar la actividad             
                name, 
              },
              defaults: {                            // si no encuentra... la crea lo hace con los valores del defaults
                name, image, description, released, rating, platforms
              }
        })

        // [action, shoter]
        // const Idgenres = Genre.fidAall

        newGame.addGenre(genres)
                        // [1,2]



        //res.send(`Actividad creada: ${JSON.stringify(newGame)} estado: ${estado}`)
        res.send(estado)
        //res.status(200).json({msj: estado})
    } catch (error) {
        //console.log(er.parent)
        //res.send(er)
        //res.status(404).json({error: er.message})
        res.status(404).json({error: error.message})
    }

})

//-- Me traido todos los GENEROS y lo gueardo a mi DB

router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.findAll()
        
        !genres.length && await addAllGenres()
        
        res.send(await Genre.findAll({
            order: [
                ["name", "ASC"]
            ]
        }))
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

// -- Get Plataformas ------------------------

router.get('/platforms', async (req, res) => {
    try {
        const games = await getApiInfo()
        const allPlatforms = []
        games.forEach(game => {
            game.platforms.forEach(platform => {
                if(!allPlatforms.includes(platform)){
                    allPlatforms.push(platform)
                }
            })
        })
        res.send(allPlatforms) 
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;




// const {getAllOneCountries, getIdCountry, addActivity} = require('../Controllers')

// const router = Router();


// router.get('/countries', getAllOneCountries);
// router.get('/countries/:idPais', getIdCountry);
// router.post('/activities', addActivity);