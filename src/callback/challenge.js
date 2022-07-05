const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; 
const API = 'https://api.escuelajs.co/api/v1';
/**
 * @param {*} urlApi 
 * @param {*} callback 
 * Esta es la función principal la cual obtendra la informacion de un producto como un objeto
 */
function fetchData(urlApi, callback){
    let xhttp = new XMLHttpRequest();//Crea un objeto XMLHttpRequest

    xhttp.open('GET', urlApi, true);//Utiliza el metodo open
    xhttp.onreadystatechange = function (event){//Metodo onreadystatechange
        if(xhttp.readyState === 4){//MEtodo readyState
            if(xhttp.status === 200){//Metodo status
                callback(null, JSON.parse(xhttp.responseText));//El metodo JSON.parse transforma texto en un objeto
            } else {                                                                  //El atributo retorna un DOMstring que contiene la respuesta a la consulat
            const error = new Error('Error' + urlApi);//Se inicia un objeto error donde se envian 2 argumentos, el argumento de url es para identificar donde se produjo el error
            return callback(error, null);//Se ejecuta el callback tomando como argumentos el error y null debido a que no se pudo obtener el objeto
        } 
        }
    }
    xhttp.send();//Envia la peticion al servidor
}
/**
 * **Se invoca la funcion tomando como argumentos la Variable API que es la variable que contiene la url que vamos a usar 
 * y ademas tiene una especificacion más que es products hace el llamado a los datos que hay en el servidor
 * **En el segundo parametro utilizaremos el concepto de callback pasando como argumento una función anonima. 
 *** En donde preguntaremos si existe error al momento de buscar en la API y en caso  de existir arrojar un error
 * **Seguido  de eso volvemos a llamar a la funcion haciendo el concepto de closure , pero ahora pidiendo  el id del primero elemento del array de produtos obtenidos de utilizar la primera vez la función
 * el segundo parametro es nuevamente otro callback que recibe como parametros un error y un nuevo dato, dentro de la funcion retornamos si existe algun error.
 * **Volvemos a usar un closure pero ahora buscando en el objeto previamente encontrado su categoria y el id de dicha categoria, de igual manera retornamos si esxiste algun error .
 * El primer console imprime el primer objeto del array de productos
 * El segundo console imprime el tituo del objeto del dato1
 * El tercer console imprime el nombre de la categoria del dato2 que contiene al objeto dato1
 * **
 */
fetchData(`${API}/products`, function(error1, data1){
    if(error1) return console.error(error1);//se pregunta si existe algun error en la primera peticion de todos los productos mediante las url de API
    fetchData(`${API}/products/${data1[0].id}`,function(error2,data2){//
        if(error2) return console.error(error2);
        fetchData(`${API}/categories/${data2?.category?.id}`,function(error3, data3){
            if(error3) return console.error(error3);
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
            console.log(data1[1]);
            console.log(data1[2]);
            console.log(data1[3]);
        });
    });
});