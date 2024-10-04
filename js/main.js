let buscador = document.getElementById("buscador");//crea la variable buscador, donde crea el elemento único relacionada al html
let texto = document.getElementById("texto"); //crea la variable texto, donde crea el elemento único texto relacionado al html
let gif = document.getElementById("gif") //creo la variable gif para el elemento gif relacionado en el html


const apiKey = "uqYloTLYU67kzumseLn8koIgdcqxDWUz" //en la variable constante apikey guardo la clave de Api que voy a necesitar para hacer las peticiones en giphy

const llamada =(ak,kw) => { //en la variable const llamada guardo una función callback que me retorna un fetch
    return fetch(
`https://api.giphy.com/v1/gifs/search?
api_key=${ak}
&q=${kw}
&limit=9
&offset=0
&rating=g
&lang=en
&bundle=messaging_non_clips
`); //configuro la dirección de url con los parámetros que se ingresan en ak y kw
}


buscador.addEventListener("click", () => { //creo el evento buscador que recibe los eventos click y una funcion callback
    let tex = texto.value; //crea la variable tex donde guarda el valor ingresado en el texto por el buscado 

    llamada(apiKey, tex) //consume la promesa con las variables de la url y el texto de busaqueda
    .then((response) => { //en este primer then transforma la respuesta a código json
        return response.json(); //retorna respuesta en json
    })
    .then((results) => { //usa el resultado del anterior then
        gif.innerHTML = "" //uso esta acción para poder buscar distintos parámetros y que las imágenes que se muestran cambien automaticamente 
        results.data.forEach(element => { //todos los resultados se recorren con un for y realizan lo siguiente
            console.log(element.images.original.url); //muestro cada imagen en cada dirección que encuentra en el recorrido
            let img = document.createElement("img"); //crea un elemento imagen para agregar al html

            img.setAttribute("src", element.images.original.url); //a ese elemento le atribuye en scr lo encontrado en la ubicación url en ese elemento encontrado
            gif.appendChild(img); //crea un hijo en el archivo html para cada imagen
        });
    })
    .catch((error) =>{ //mesaje de error en caso de que los then no se hayan podido ejecutar
        console.error("error en la consulta: " + error.message) //muestra en pantalla roja el mensaje de errors
    })
})
