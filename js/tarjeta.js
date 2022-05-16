

//DOM:
const tarjeta = document.querySelector("#tarjeta");
const formulario = document.querySelector("#formulario-tarjeta");
const inputNumero= document.querySelector("#inputNumero");
const inputNombre = document.querySelector("#inputNombre");
const numeroTarjeta = document.querySelector("#tarjeta .numero");
const nombreTarjeta = document.querySelector("#tarjeta .nombre");
const logoMarca = document.querySelector("#logo-marca");
const firma = document.querySelector("#tarjeta .firma p");
const mesExpiracion = document.querySelector("#mesExpiracion");
const yearExpiracion = document.querySelector("#yearExpiracion");
const ccv = document.querySelector("#ccv");
const inputCCV = document.querySelector("#inputCCV");



//Rellenar select mes
for(let i = 1; i<13; i++){
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.innerText=i;
    formulario.selectMes.appendChild(opcion);
}

//Rellenar select year:
const yearActual = new Date().getFullYear();
for(let i= yearActual; i<= yearActual + 8; i++){
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.innerText=i;
    formulario.selectYear.appendChild(opcion);
}

//Rellenar input número tarjeta:
if(inputNumero.value ==""){
    numeroTarjeta.textContent= "#### #### #### ####"
    logoMarca.innerHTML="";
}

inputNumero.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;
    inputNumero.value = valorInput
                        //Guardo el valor del input y lo reemplazo por una expresion regular
                        .replace(/\s/g, "") 
                        //Elimina espacios en blanco
                        .replace(/\D/g, "") 
                        //Elimina todas las letras
                        .replace(/([0-9]{4})/g, "$1 ")
                        //Agrega un espacio cada 4 números
                        .trim();
                        //Quita el espacio final

    numeroTarjeta.textContent = valorInput;
//Qué aparece si el usuario borra los números:
    if(valorInput ==""){
        numeroTarjeta.textContent= "#### #### #### ####"
        logoMarca.innerHTML="";
    }

    //Incluir logo visa
    if(valorInput[0] ==4){
        logoMarca.innerHTML=""; //Para que no se repita el logo cada vez que se escribe 4
        const imagen = document.createElement("img");
        imagen.src="images/logo-visa.jpg";
        logoMarca.appendChild(imagen);
    } else if (valorInput[0] ==5){
        logoMarca.innerHTML=""; //Para que no se repita el logo cada vez que se escribe 4
        const imagen = document.createElement("img");
        imagen.src="images/logo-mastercard.jpg";
        logoMarca.appendChild(imagen);
    }

    mostrarFrente();
});

//Rotar la tarjeta para ver el frente:
function mostrarFrente(){
    if(tarjeta.classList.contains("active")){
        tarjeta.classList.remove("active");
    }
}


/*** Rellenar input nombre de la tarjeta */
if(inputNombre.value ==""){
    nombreTarjeta.textContent= "Nombre Titular";
    firma.textContent= "Nombre Titular";
}

inputNombre.addEventListener("keyup", (e) =>{
let valorInput = e.target.value; //guardo el valor del input en una variable

inputNombre.value = valorInput.replace(/[0-9]/g, "");

nombreTarjeta.textContent=valorInput;
firma.textContent = valorInput;

if(valorInput ==""){
    nombreTarjeta.textContent= "Nombre Titular";
    firma.textContent= "Nombre Titular";
}

mostrarFrente();

});

// Select mes
formulario.selectMes.addEventListener("change", (e) =>{
    mesExpiracion.textContent= e.target.value;
    mostrarFrente();
})

//Select year
formulario.selectYear.addEventListener("change", (e) =>{
    yearExpiracion.textContent= e.target.value.slice(2);
    mostrarFrente();
});

//Código de seguridad CCV: dar vuelta tarjeta:
inputCCV.addEventListener("keyup", () =>{
    if(!tarjeta.classList.contains("active")){
        tarjeta.classList.toggle("active");
    }

    //Validación del código de seguridad: sin espacio, caracteres máximos, etc
    inputCCV.value= inputCCV.value
    .replace(/\s/g, "") 
    //Elimina espacios en blanco
    .replace(/\D/g, "");
    //Elimina todas las letras
    
    //Rellenar el CCV en la tarjeta:
    ccv.textContent= inputCCV.value;                                      

});

