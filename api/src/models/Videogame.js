const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// [ ] Videojuego con las siguientes propiedades:
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {                         
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    //release date (fecha de lanzameinto)
    released: {
      type: DataTypes.STRING,
      allowNull: false,     
    },
    rating: { 
      type: DataTypes.INTEGER,
            validate: {   // con esto puedo validar los values antes de ser agregados
                min: 1,
                max: 5
                //etc
            },
      allowNull: false,       
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://thumbs.dreamstime.com/z/dise%C3%B1o-de-fuentes-estilo-juego-arcada-alfabeto-videojuegos-los-a%C3%B1os-retro-s-letras-y-n%C3%BAmeros-167453420.jpg'
    },
  },{timestamps : false});
};
