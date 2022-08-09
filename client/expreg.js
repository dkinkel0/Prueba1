//---------------------------------------------------------------------------------------------------------------------
// Coincidencias Basicas
// .       - Cualquier Caracter, excepto nueva linea
// \d      - Cualquier Digitos (0-9)
// \D      - No es un Digito (0-9)
// \w      - Caracter de Palabra (a-z, A-Z, 0-9, _)
// \W      - No es un Caracter de Palabra.
// \s      - Espacios de cualquier tipo. (espacio, tab, nueva linea)
// \S      - No es un Espacio, Tab o nueva linea.

// Limites
// \b      - Limite de Palabra
// \B      - No es un Limite de Palabra
// ^       - Inicio de una cadena de texto
// $       - Final de una cadena de texto

// Cuantificadores:
// *       - 0 o Más
// +       - 1 o Más
// ?       - 0 o Uno
// {3}     - Numero Exacto
// {3,4}   - Rango de Numeros (Minimo, Maximo)

// Conjuntos de Caracteres
// []      - Caracteres dentro de los brackets
// [^ ]    - Caracteres que NO ESTAN dentro de los brackets

// Grupos
// ( )     - Grupo
// |       - Uno u otro
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// casi todos los simbolos hay que escaparlos porqeu por lo general significan algo



//    /^[0-9]+$/  ---> la cadena desde el principio al final tenga al menos una vez un numero
// ^ comineza con
// $ finaliza
// + que lo anteiorr debe estar al menos una vez

//---------------------------------------------------------------------------------------------------------------------
// --->  /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/
// ^https? que comience con http con la s opcional
// : le siga lo dos puntos 
// \ escapo de lo anterio busco / escapo de nuevo con \ y busco /
// .+ cualquier cara una o mas veces 
// escapo con \ y busco un punto
//
// despue del punto una extension jpg ó jpeg etc las extensiones van entre parentesis y el sigo peso significa al final 
// la barra | significa la condicion 'ó' 
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//  /lorem/ig  busca la palabra lorem en la cadena de texto 
// i --> ignora las mayusculas y minusculas
// g no se queda con la primer coincidencia, busca en todo el texto
//---------------------------------------------------------------------------------------------------------------------
// https://happymag.tv/wp-content/uploads/2021/09/Untitled-2021-09-09T171734.171.jpg 

//---------------------------------------------------------------------------------------------------------------------
// ---> /^\d+$/
// ^ que empiece con
// \d culauqier digito
// + una o mas veces
// $ finalice con
//---------------------------------------------------------------------------------------------------------------------

// Juego nuevo 123 (version extendida)
//  / ^[\d]{3}    / no puede comenzar con solo numeros
//  /^\d{3}/ aranca con 3 digitos  
//  /^\W{3}/ comienza con 3 caracteres especiales
//  /^\s{3}/ comienza con tres espacion

//      /^(\d|\W|\s){1}/

// --> /^(\d|\W|\s){1}[a-z]{1}/ig  el primer caracter es epecial y continua con una letra



//if (/^(\d|\W|\s){1}/i.test(name)){
// if (/[^h]/i.test(name)){
//     console.log("entre")
// }else{
//     console.log("no entre")
// }


// console.log(/[^h]/.test('ha'))


// const texto = 	"Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged."

// console.log(texto.length)




// Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.
// Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.
// Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.

