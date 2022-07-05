function sum(num1, num2){  // Se Crea una primera funcion para despues utilizarla como argumento en una nueva función
    return num1 + num2;
}

function calc(num1,num2, callback){ //Esta es la funcion en donde aremos el callback que recibe 3 argumentos, 2 numericos y una funcion. Esta funcion es laque sera el callback
    return callback(num1, num2);
}

console.log(calc(2, 2, sum));//Al llamar la segunda función utilizamos el callback, al utilizar  la funcion sum como un argumento de otro función.

setTimeout(function () {                   //Por si mismo ya el un callback
    console.log(`Hola JavaScript`);
}, 5000)
//Una funcion que recive otra funcion para ser ejecutada segun sea el caso
//setTimeout es un callback por defecto
function gretting (name){
    console.log(`Hola ${name} bienvenido al curso de asíncronismo`);
}
setTimeout(gretting, 2000, 'Christian');
const maria = 'Maria';
setTimeout(gretting, 5000, maria);
